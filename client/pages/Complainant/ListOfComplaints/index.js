import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Notification or Toast
import { useAddress, useStorage, useContract } from "@thirdweb-dev/react";

//Firebase Firestore
import {
  doc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
// import { db } from "@/config/firebaseConfig";
import { db } from "@/config/firebaseConfig";

// Custom Hooks
import useDataDecryption from "@/Hooks/useDataDecryption";
import useImageDecryption from "@/Hooks/useImageDecryption";

// Components
import Button from "@/Components/Button";
import Spinner from "@/Components/Spinner";
import Modal from "@/Components/Modal";
import { contractAddress } from "@/config/contract";
// import { Dialog, DialogContent } from "../../../Components/UI/dialog";

const ListOfComplaints = () => {
  const storage = useStorage();
  const address = useAddress();
  const decryptData = useDataDecryption();
  const decryptImage = useImageDecryption();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState({
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
      const fetchComplaints = async () => {
        const q = query(
          collection(db, "complaints"),
          where("userAddress", "==", address)
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

  const viewApproved = async (currentComplaintData) => {
    setIsOpen(true);
    setLoading(true);
    const data = await contract.call("getComplaintByID", [
      currentComplaintData.complaintID,
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

  return (
    <>
      <div className="container mx-auto my-10 ">
        <h1 className="text-2xl font-bold text-center my-5">
          List of Complaints - Pending
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
          <h1 className="font-bold text-red-500 text-center">No Complaints</h1>
        )}
      </div>
      <div className="container mx-auto my-10 ">
        <h1 className="text-2xl font-bold text-center my-5">
          Validated Complaints
        </h1>
        {complaints.length !== 0 ? (
          <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-stone text-stone-700 border-b border-gray-700 ">
                <th className="py-2 px-4"> # </th>
                <th className="py-2 px-4"> Registered at </th>
                <th className="py-2 px-4">Status</th>
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
                        {complaint.status}
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
          <h1 className="font-bold text-red-500 text-center">No Complaints</h1>
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
            <div className="flex justify-center my-3">
              <Button outlined={true} onClick={handlePDFDownload}>
                Download as PDF
              </Button>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 [&>p]:my-2">
                <p>
                  <span className="font-bold">Complaint ID:</span>{" "}
                  {selectedComplaint.complaintID}
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
                  {selectedComplaint.complaintCreatedAt}
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
              <img
                src={selectedComplaint.image}
                alt="Complaint Image"
                className="w-64 h-auto"
              />
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ListOfComplaints;
