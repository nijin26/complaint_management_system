import React, { useState } from "react";
import Button from "@/Components/Button";

const RegisterNCR = () => {
  const [selectedTab, setSelectedTab] = useState(1);
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

  const [formData, setFormData] = useState({
    ncrNumber: "",
    date: "",
    policeStation: "",
    district: "",
    reportDateTime: "",
    complainantName: "",
    complainantAddress: "",
    offenceReported: "",
    placeOfOccurrence: "",
    occurrenceDateTime: "",
    witnessAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="w-1/2 border sticky top-2 rounded-lg p-8 m-4">
        <div className=" flex justify-between">
          <Button
            outlined={selectedTab !== 1 ? true : false}
            onClick={() => setSelectedTab(1)}
          >
            Complaint
          </Button>
          <Button
            outlined={selectedTab !== 2 ? true : false}
            onClick={() => setSelectedTab(2)}
          >
            Complainant
          </Button>
        </div>
        {selectedTab === 1 ? (
          <div className="w-full">
            <h1 className="my-6 font-bold text-center text-xl">
              Complaint Details
            </h1>
            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2 [&>p]:my-2">
                <p>
                  <span className="font-bold">Complaint ID:</span>{" "}
                  {selectedComplaint.complaintID}
                </p>

                <p className="text-blue-500 cursor-pointer">
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
            </div>
          </div>
        ) : (
          <div className="w-full">
            <h1 className="my-4 font-bold text-center text-xl">
              Complainant's Details
            </h1>
            <p>
              <span className="font-bold">Complainant's Name</span>{" "}
              {selectedComplaint.remarks}
            </p>
          </div>
        )}
      </div>

      <div className="border rounded-lg p-8 w-1/2 m-4">
        <h1 className="font-bold text-2xl text-center">Register NCR</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="ncrNumber">NCR Number:</label>
            <input
              type="text"
              id="ncrNumber"
              name="ncrNumber"
              value={formData.ncrNumber}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="date">Date:</label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>

          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="policeStation">Police Station:</label>
            <input
              type="text"
              id="policeStation"
              name="policeStation"
              value={formData.policeStation}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>

          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="district">District:</label>
            <input
              type="text"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>

          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="reportDateTime">
              Enter Date and Time of Report:
            </label>
            <input
              type="datetime-local"
              id="reportDateTime"
              name="reportDateTime"
              value={formData.reportDateTime}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="complainantName">Enter name of complainant:</label>
            <input
              type="text"
              id="complainantName"
              name="complainantName"
              value={formData.complainantName}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="complainantAddress">Address of complainant:</label>
            <input
              type="text"
              id="complainantAddress"
              name="complainantAddress"
              value={formData.complainantAddress}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="offenceReported">Offence reported:</label>
            <input
              type="text"
              id="offenceReported"
              name="offenceReported"
              value={formData.offenceReported}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="placeOfOccurrence">Place of occurrence:</label>
            <input
              type="text"
              id="placeOfOccurrence"
              name="placeOfOccurrence"
              value={formData.placeOfOccurrence}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>

          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="occurrenceDateTime">
              Date and Time of occurrence:
            </label>
            <input
              type="text"
              id="occurrenceDateTime"
              name="occurrenceDateTime"
              value={formData.occurrenceDateTime}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <div className="flex flex-col [&>label]:font-bold [&>label]:my-2">
            <label htmlFor="witnessAddress">Address of witness:</label>
            <input
              type="text"
              id="witnessAddress"
              name="witnessAddress"
              value={formData.witnessAddress}
              onChange={handleChange}
              className="border border-gray-300 px-2 py-1"
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterNCR;
