import React, { useEffect, useState } from "react";

import {
  complaintType,
  stationSectors,
  getPoliceStation,
} from "../../../public/utils";
import Button from "../../../Components/Button";

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState({
    complaintType: "",
    placeOfIncident: "",
    dateAndTime: "",
    stationSector: "",
    policeStation: "",
    complaintSubject: "",
    complaintDescription: "",
  });

  const [policeStations, setPoliceStations] = useState([]);

  useEffect(() => {
    const listOfStations = getPoliceStation(
      complaint.stationSector || "Kollam"
    );
    setPoliceStations(listOfStations);
  }, [complaint.stationSector]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", complaint);
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
            id="complaintNature"
            name="complaintNature"
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
            htmlFor="dateAndTime"
            className="block text-sm font-medium text-gray-700"
          >
            Date and Time
          </label>
          <input
            required
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
            id="policeStation"
            name="policeStation"
            className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={complaint.policeStation}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select police station
            </option>
            {policeStations.map((station) => (
              <option key={station.stationID}>{station.stationName}</option>
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
            type="file"
            className="bg-stone-400 text-white shadow-md shadow-slate-400 w-full rounded-md p-2"
          />
        </div>

        <Button className={"w-full"} onClick={submitHandler}>
          {" "}
          Register Complaint
        </Button>
      </form>
    </div>
  );
};

export default ComplaintForm;
