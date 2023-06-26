import Button from "@/Components/Button";
import Spinner from "@/Components/Spinner";
import { db } from "@/config/firebaseConfig";
import { useAddress } from "@thirdweb-dev/react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const EditSuperiorProfile = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) return toast.warn("You must be connected to the wallet.");
    setLoading(true);
    const data = formData;
    data.superiorWalletAddress = address;
    try {
      await setDoc(doc(db, "superiors", address), data);
      localStorage.setItem("superiorID", address);
      toast.success("Profile updated successfully");
      setLoading(false);
      router.push("/Superior/Profile");
    } catch (err) {
      toast.error("Error in creating superior profile");
      console.log(err, "error in creating superior's profile");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-5">
      <h1 className="text-center font-bold text-2xl">Edit Superior Profile</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter Full Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="designation"
            >
              Designation
            </label>
            <select
              className="border rounded-lg py-2 px-3 w-full"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            >
              <option value="">Select Designation</option>
              {designations.map((designation) => (
                <option key={designation} value={designation}>
                  {designation}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="department"
            >
              Department/Division
            </label>
            <select
              className="border rounded-lg py-2 px-3 w-full"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department/Division</option>
              {departments.map((department) => (
                <option key={department} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="border rounded-lg py-2 px-3 w-full"
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
              placeholder="Enter Contact"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="officeAddress"
            >
              Office Address
            </label>
            <textarea
              className="border rounded-lg py-2 px-3 w-full"
              id="officeAddress"
              name="officeAddress"
              value={formData.officeAddress}
              onChange={handleChange}
              required
              placeholder="Enter Office Address"
            ></textarea>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <Button className="w-full" type="submit">
              Save Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

const designations = [
  // "Director General of Police (DGP)",
  "Additional Director General of Police (ADGP)",
  "Inspector General of Police (IGP)",
  "Deputy Inspector General of Police (DIG)",
  "Superintendent of Police (SP)",
];
const departments = [
  "Crime Branch",
  "Traffic Department",
  "Cyber Crime Unit",
  "Special Operations Division",
  "Intelligence Bureau",
  "Anti-Terrorism Squad",
  "Narcotics Control Bureau",
  "Economic Offenses Wing",
];
export default EditSuperiorProfile;
