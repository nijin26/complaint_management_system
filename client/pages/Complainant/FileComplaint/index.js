import React, { useEffect, useState } from "react";
import useRouter from "next/router";
import { setDoc, doc } from "firebase/firestore";
import { useContract, useStorage, useAddress } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
// import { v4 as uuid } from "uuid";
import ShortUniqueId from "short-unique-id";

import useImageEncryption from "../../../Hooks/useImageEncryption";
import useDataEncryption from "../../../Hooks/useDataEncryption";
import { db } from "../../../config/firebaseConfig";

import Button from "../../../Components/Button";
import Spinner from "../../../Components/Spinner";

import {
  complaintType,
  stationSectors,
  getPoliceStation,
} from "../../../public/utils";

const ComplaintForm = () => {
  // const router = useRouter();
  const address = useAddress();
  const storage = useStorage();
  const encryptData = useDataEncryption();
  const encryptImage = useImageEncryption();
  const uid = new ShortUniqueId({ length: 6 });

  const [complaint, setComplaint] = useState({
    complaintID: "",
    userAddress: "",
    complaintType: "",
    placeOfIncident: "",
    landmark: "",
    dateAndTime: "",
    stationSector: "",
    policeStation: "",
    complaintSubject: "",
    complaintDescription: "",
    complaintCreatedAt: "",
    lastUpdated: "",
    image: "",
  });

  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listOfStations = getPoliceStation(
      complaint.stationSector || "Kollam"
    );
    setPoliceStations(listOfStations);
  }, [complaint.stationSector]);

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (
        !file.type.startsWith("image/jpeg") &&
        !file.type.startsWith("image/png")
      ) {
        toast.warn("Selected file is not a JPEG or PNG image. Try Again");
        return;
      }

      if (file.size > 3 * 1024 * 1024) {
        toast.warn("Selected image exceeds the maximum file size of 3MB.");
        return;
      }

      const encryptedImage = await encryptImage(file);
      setComplaint((prev) => ({ ...prev, image: encryptedImage }));
      toast.success("Selected Image is Encrypted");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const complaintData = complaint;
    complaintData.complaintID = uid();
    complaintData.userAddress = address;
    complaintData.complaintCreatedAt = new Date().getTime();
    const encryptedData = encryptData(complaintData);
    toast.success("Complaint data is succesfully encrypted. Please wait.");
    const complaintUploadedCID = await storage.upload(
      JSON.stringify(encryptedData)
    );
    toast.success("Encrypted data is uploaded to IPFS network.");
    const data = {
      compalintID: complaintData.complaintID,
      stationID: complaint.policeStation.stationID,
      userAddress: address,
      detailsIPFSCID: complaintUploadedCID,
      complaintCreatedAt: complaintData.complaintCreatedAt,
      status: "Pending For Approval",
      remarks: "",
    };
    try {
      await setDoc(doc(db, "complaints", complaintData.complaintID), data);
      toast.success("Complaint registered successfully.");
      setLoading(false);
    } catch (error) {
      toast.error("Complaint Registration Error. Try Again");
      console.error("Error adding complaint:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComplaint((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-md mx-auto mb-10">
      <h2 className="text-xl font-bold font-sans text-center my-11 uppercase">
        File a Complaint or Offence
      </h2>
      <form className="mt-8 space-y-6" onSubmit={submitHandler}>
        <div>
          <label
            htmlFor="complaintNature"
            className="block text-sm font-medium text-gray-700"
          >
            Complaint Type
          </label>
          <select
            required
            disabled={loading}
            id="complaintType"
            name="complaintType"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.complaintType}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select complaint type
            </option>
            {complaintType.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="placeOfIncident"
            className="block text-sm font-medium text-gray-700"
          >
            Place of Incident
          </label>
          <input
            required
            disabled={loading}
            type="text"
            id="placeOfIncident"
            name="placeOfIncident"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.placeOfIncident}
            onChange={handleChange}
          />
        </div>
        <div>
          <label
            htmlFor="landmark"
            className="block text-sm font-medium text-gray-700"
          >
            LandMark{" "}
          </label>
          <input
            required
            disabled={loading}
            type="text"
            id="landmark"
            name="landmark"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.landmark}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="dateAndTime"
            className="block text-sm font-medium text-gray-700"
          >
            Date and Time
          </label>
          <input
            required
            disabled={loading}
            id="dateAndTime"
            name="dateAndTime"
            type="datetime-local"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            placeholder="Enter date and time"
            value={complaint.dateAndTime}
            onChange={handleChange}
          />
        </div>

        <div>
          <label
            htmlFor="stationSector"
            className="block text-gray-700 font-bold mb-2"
          >
            Station Sector
          </label>
          <select
            required
            disabled={loading}
            id="stationSector"
            name="stationSector"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.stationSector}
            onChange={handleChange}
          >
            <option value="">-- Select Sector --</option>
            {stationSectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="policeStation"
            className="block text-sm font-medium text-gray-700"
          >
            Police Station
          </label>
          <select
            required
            disabled={loading}
            id="policeStation"
            name="policeStation"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.policeStation.stationID || ""}
            onChange={(e) => {
              const selectedStationObject = policeStations.find(
                (station) => station.stationID === e.target.value
              );
              setComplaint((prev) => ({
                ...prev,
                policeStation: selectedStationObject,
              }));
            }}
          >
            <option value="" disabled>
              Select police station
            </option>
            {policeStations.map((station) => (
              <option key={station.stationID} value={station.stationID}>
                {station.stationName}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4">
          <label
            htmlFor="complaintSubject"
            className="block text-gray-700 font-bold mb-2"
          >
            Complaint Subject
          </label>
          <input
            disabled={loading}
            value={complaint.complaintSubject}
            type="text"
            required
            id="complaintSubject"
            name="complaintSubject"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            placeholder="Enter Complaint Subject"
            onChange={handleChange}
          />
        </div>

        <div className="my-4">
          <label
            htmlFor="complaintDescription"
            className="block text-gray-700 font-bold mb-2"
          >
            Complaint Description
          </label>
          <textarea
            value={complaint.complaintDescription}
            required
            disabled={loading}
            id="complaintDescription"
            name="complaintDescription"
            className="w-full h-32 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            placeholder="Enter Complaint Description"
            onChange={handleChange}
          />
        </div>
        <div className="my-4">
          <label
            htmlFor="uploadImage"
            className="block text-gray-700 font-bold mb-2"
          >
            Upload Related Image
          </label>
          <input
            disabled={loading}
            onChange={handleImage}
            type="file"
            className="bg-stone-400 text-white shadow-md shadow-slate-400 w-full rounded-md p-2"
          />
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <Button className={"w-full"} type="submit" disabled={loading}>
            {" "}
            Register Complaint
          </Button>
        )}
      </form>
    </div>
  );
};

export default ComplaintForm;
