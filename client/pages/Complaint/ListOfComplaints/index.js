import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify"; // Notification or Toast
import { useContract, useAddress, useStorage } from "@thirdweb-dev/react";

//Firebase Firestore
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";

// Custom Hooks
import useDataDecryption from "@/Hooks/useDataDecryption";
import useImageDecryption from "@/Hooks/useImageDecryption";

// Components
import Button from "@/Components/Button";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { ethers } from "ethers";
// import { Dialog, DialogContent } from "../../../Components/UI/dialog";

const ListOfComplaints = () => {
  const storage = useStorage();
  const address = useAddress();
  const decryptData = useDataDecryption();
  const decryptImage = useImageDecryption();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState({
    userAddress: "",
    userName: "",
    complaintCreatedAt: "",
    complaintDescription: "",
    complaintID: "",
    complaintSubject: "",
    complaintType: "",
    dateAndTime: "",
    image: "",
    landmark: "",
    placeOfIncident: "",
    policeStation: {
      phoneNumber: "",
      stationID: "",
      stationName: "",
    },
    stationSector: "",
    status: "",
    remarks: "",
  });

  const { contract } = useContract(contractAddress);

  // Fetch list of data on mount
  useEffect(() => {
    if (address) {
      const stationID = localStorage.getItem("stationID");
      const fetchComplaints = async () => {
        const q = query(
          collection(db, "complaints"),
          where("stationID", "==", stationID)
        );

        const querySnapshot = await getDocs(q);
        const listOfComplaints = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          listOfComplaints.push(data);
        });
        setComplaints(listOfComplaints);
      };
      fetchComplaints();
    }
  }, [address]);

  const viewHandler = async (complaintData) => {
    setIsOpen(true);
    setLoading(true);
    const dataFetched = await storage.downloadJSON(
      complaintData.detailsIPFSCID
    );
    const decryptedData = await decryptData(dataFetched);
    const decryptedImage = await decryptImage(decryptedData.image);
    decryptedData.image = decryptedImage;
    setSelectedComplaint((prev) => ({
      ...prev,
      ...decryptedData,
      dateAndTime: new Date(decryptedData.dateAndTime).toLocaleString(),
      status: complaintData.status,
      remarks: complaintData.remarks,
      detailsIPFSCID: complaintData.detailsIPFSCID,
    }));
    toast.success("Selected Complaint Data is Successfully Decrypted");
    setLoading(false);
  };

  const handlePDFDownload = () => {
    console.log("Download the given complaint as PDF");
  };

  const viewComplainantHandler = () => {
    console.log(
      "View handler is called",
      selectedComplaint.userAddress,
      selectedComplaint.userName
    );
  };

  const handleApprove = async () => {
    if (remarks === "" || remarks.length <= 3)
      return toast.warn("Add any remarks beforing approving");

    // Add approved data to blockchain network
    updateContract("Approved");

    //Update status and remarks when approved in Firebase
    const currentComplaintRef = doc(
      db,
      "complaints",
      selectedComplaint.complaintID
    );
    await updateDoc(currentComplaintRef, {
      status: "Approved",
      remarks: remarks,
    });
    setSelectedComplaint((prev) => ({
      ...prev,
      status: "Approved",
      remarks: remarks,
    }));
    toast.success("Selected complaint is approved");

    setIsOpen(false);
  };

  const handleIgnore = async () => {
    if (remarks === "" || remarks.length <= 3)
      return toast.warn("Add any remarks or reason for ignoring.");
    //Update or add data to blockchain network
    updateContract("Ignored");

    // Update status & remarks to Firebase when ignored
    const currentComplaintRef = doc(
      db,
      "complaints",
      selectedComplaint.complaintID
    );
    await updateDoc(currentComplaintRef, {
      status: "Ignored",
      remarks: remarks,
    });

    setSelectedComplaint((prev) => ({
      ...prev,
      status: "Ignored",
      remarks: remarks,
    }));
    toast.success("Selected complaint is ignored.");
    setIsOpen(false);
  };

  const updateContract = async (status) => {
    // Blockchain Integration
    //Update or Add complaint to Blockchain network
    const currentTime = new Date().getTime().toString();
    const complaintCreated = selectedComplaint.complaintCreatedAt.toString();
    try {
      const data = {
        complaintID: selectedComplaint.complaintID,
        stationID: selectedComplaint.policeStation.stationID,
        complainantWalletAddress: ethers.utils.getAddress(
          selectedComplaint.userAddress
        ),
        stationWalletAddress: ethers.utils.getAddress(address),
        complaintCreatedAt: complaintCreated,
        complaintValidatedAt: currentTime,
        detailsIPFSCID: selectedComplaint.detailsIPFSCID,
        remarks: remarks,
        status: status,
      };
      const complaintAdded = await contract.call("addComplaint", [data]);
      console.info("contract call successs", data, complaintAdded);
    } catch (err) {
      console.log("Insdie catch block");
      console.error("contract call failure", err);
    }
  };

  const viewApproved = async (currentComplaintData) => {
    setIsOpen(true);
    setLoading(true);
    const data = await contract.call("getComplaintByID", [
      currentComplaintData.compalintID,
    ]);
    toast.info("Fetched encrypted data from Blockchain network");

    const dataFetched = await storage.downloadJSON(data.detailsIPFSCID);
    const decryptedData = await decryptData(dataFetched);
    const decryptedImage = await decryptImage(decryptedData.image);
    decryptedData.image = decryptedImage;
    setSelectedComplaint((prev) => ({
      ...prev,
      ...decryptedData,
      status: data.status,
      remarks: data.remarks,
      detailsIPFSCID: data.detailsIPFSCID,
    }));
    toast.success(
      "Selected Complaint Data is Successfully Fetched from Blockchain Network & Decrypted"
    );
    setLoading(false);
  };

  const handleReport = (complaintData) => {
    router.push({
      pathname: "/Complaint/Report/Register",
      query: { complaintData: JSON.stringify(complaintData) },
    });
  };

  return (
    <>
      <div className="container mx-auto my-10 ">
        <h1 className="text-2xl font-bold text-center my-5">
          List Of Pending Complaints
        </h1>
        {complaints.length !== 0 ? (
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-stone text-stone-700 border-b border-gray-700 ">
                <th className="py-2 px-4"> # </th>
                <th className="py-2 px-4"> Registered at </th>
                <th className="py-2 px-4"> Status </th>
                <th className="py-2 px-4"> More Details </th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => {
                if (complaint.status === "Pending For Approval")
                  return (
                    <tr key={complaint.id} className="border-b border-gray-300">
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">
                        {new Date(
                          complaint.complaintCreatedAt
                        ).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-center">
                        {complaint.status}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button onClick={() => viewHandler(complaint)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center text-red-500 font-bold">Empty</h2>
        )}
      </div>
      <div className="container mx-auto my-10 ">
        <h1 className="text-2xl font-bold text-center my-5">
          Approved Complaints List
        </h1>
        {complaints.length !== 0 ? (
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-stone text-stone-700 border-b border-gray-700 ">
                <th className="py-2 px-4"> # </th>
                <th className="py-2 px-4"> Registered at </th>
                <th className="py-2 px-4"> Register FIR/NCR </th>
                <th className="py-2 px-4"> View </th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => {
                if (complaint.status !== "Pending For Approval")
                  return (
                    <tr key={complaint.id} className="border-b border-gray-300">
                      <td className="py-2 px-4 text-center">{index + 1}</td>
                      <td className="py-2 px-4 text-center">
                        {new Date(
                          complaint.complaintCreatedAt
                        ).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button
                          outlined={true}
                          onClick={() => handleReport(complaint)}
                        >
                          Register
                        </Button>
                      </td>
                      <td className="py-2 px-4 text-center">
                        <Button onClick={() => viewApproved(complaint)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
        ) : (
          <h2 className="text-center text-red-500 font-bold">Empty</h2>
        )}
      </div>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        {loading ? (
          <div className="flex flex-col justify-center items-center">
            <Spinner />
            <h2> Data Decrypting.....</h2>{" "}
          </div>
        ) : (
          <div className="p-4 overflow-auto max-h-[70vh] ">
            <h2 className="text-xl font-bold mb-4 text-center">
              Complaint Details
            </h2>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 [&>p]:my-2">
                <p>
                  <span className="font-bold">Complaint ID:</span>{" "}
                  {selectedComplaint.complaintID}
                </p>

                <p
                  className="text-blue-500 cursor-pointer"
                  onClick={viewComplainantHandler}
                >
                  <span className="font-bold">Complainant's Name:</span>{" "}
                  {selectedComplaint.userName}
                </p>
                <p>
                  <span className="font-bold">Complaint Type:</span>{" "}
                  {selectedComplaint.complaintType}
                </p>
                <p>
                  <span className="font-bold">Complaint Subject:</span>{" "}
                  {selectedComplaint.complaintSubject}
                </p>
                <p>
                  <span className="font-bold">Date and Time:</span>{" "}
                  {selectedComplaint.dateAndTime}
                </p>
                <p>
                  <span className="font-bold">Place of Incident:</span>{" "}
                  {selectedComplaint.placeOfIncident}
                </p>
                <p>
                  <span className="font-bold">Status:</span>{" "}
                  {selectedComplaint.status}
                </p>
              </div>
              <div className="w-full md:w-1/2 [&>p]:my-2">
                <p>
                  <span className="font-bold">Station Sector:</span>{" "}
                  {selectedComplaint.stationSector}
                </p>
                <p>
                  <span className="font-bold">Landmark:</span>{" "}
                  {selectedComplaint.landmark}
                </p>
                <p>
                  <span className="font-bold">Police Station:</span>{" "}
                  {selectedComplaint.policeStation.stationName}
                </p>
                <p>
                  <span className="font-bold">Complaint Created At:</span>{" "}
                  {new Date(
                    selectedComplaint.complaintCreatedAt
                  ).toLocaleString()}
                </p>
                <p>
                  <span className="font-bold block">
                    Complaint Description:
                  </span>{" "}
                  {selectedComplaint.complaintDescription}
                </p>

                <p>
                  <span className="font-bold">Remarks:</span>{" "}
                  {selectedComplaint.remarks}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col items-center justify-center">
              <h3 className="text-lg  font-bold mb-2">Image</h3>
              <a href={selectedComplaint.image} target="_blank">
                <img
                  src={selectedComplaint.image}
                  alt="Complaint Image"
                  className="w-64 h-auto"
                />
              </a>

              <div className="my-5">
                <label
                  htmlFor="remarks"
                  className="block text-sm font-medium text-gray-700"
                >
                  Remarks:
                </label>
                <input
                  required
                  disabled={loading}
                  type="text"
                  id="remarks"
                  name="remarks"
                  className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                />
              </div>
              <div className="flex justify-between my-3">
                <Button className="mx-2" onClick={handleApprove}>
                  Approve
                </Button>
                <Button outlined={true} onClick={handleIgnore}>
                  Ignore
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListOfComplaints;
