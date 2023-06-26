import Button from "@/Components/Button";
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { db } from "@/config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const SuperiorProfile = () => {
  const address = useAddress();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    superiorWalletAddress: "",
    fullName: "",
    designation: "",
    department: "",
    contact: "",
    officeAddress: "",
    approved: false,
    approvedBy: "",
  });
  useEffect(() => {
    const fetchSuperiorDoc = async () => {
      if ((address ? true : false) && router.query?.data !== "Edit") {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "superiors", address));
        if (docSnap.exists()) {
          localStorage.setItem("superiorID", docSnap.data().stationID);
          const data = docSnap.data();
          setFormData((prev) => ({ ...prev, ...data }));
          router.push("/Superior/Profile");
        }
        setLoading(false);
      }
    };
    fetchSuperiorDoc();
  }, []);

  const handleEdit = () => {
    router.push({ pathname: "/Superior/Edit", query: { data: "Edit" } });
  };

  const handleShowListOfComplaints = () => {
    if (!formData.approved)
      return toast.error(
        "You are not approved. Wait for the superior to get it validated."
      );

    router.push("/Complaint/ListOfComplaints");
  };
  const handleShowListOfStations = () => {
    if (!formData.approved)
      return toast.error(
        "You are not approved. Wait for the superior to get it validated."
      );

    router.push("/Superior/ListOfStations");
  };
  return (
    <div className="flex justify-center">
      <div className="min-w-80 bg-white rounded-lg shadow-lg p-6 mt-5">
        <h2 className="text-xl font-bold mb-4">Superior Profile</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Superior Wallet Address
          </label>
          <p>{formData.superiorWalletAddress}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Full Name
          </label>
          <p>{formData.fullName}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Designation
          </label>
          <p>{formData.designation}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Department
          </label>
          <p>{formData.department}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Contact</label>
          <p>{formData.contact}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Office Address
          </label>
          <p>{formData.officeAddress}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Approved</label>
          <p>{formData.approved ? "Yes" : "No"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Approved By
          </label>
          <p>{formData.approvedBy}</p>
        </div>

        <Button className="my-2 w-full" onClick={handleShowListOfStations}>
          List Of Stations
        </Button>
        <Button
          outlined
          onClick={handleShowListOfComplaints}
          className="w-full"
        >
          List Of Complaints
        </Button>
        <Button outlined onClick={handleEdit} className="my-2 w-full">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default SuperiorProfile;
