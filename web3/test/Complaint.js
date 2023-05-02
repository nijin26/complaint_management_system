// test/complaint.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Complaint", function () {
  let complaintContract;

  const complaintLocation = {
    placeOfIncident: "ABC",
    landmark: "XYZ",
    district: "MNO",
  };

  const complaintParty = {
    complainant: "0x1234567890123456789012345678901234567890",
    policeStation: "0x0987654321098765432109876543210987654321",
    witness: "0x5678901234567890123456789012345678901234",
    accused: "0x4321098765432109876543210987654321098765",
  };

  const complaintDetails = {
    complaintId: 1234,
    complaintNature: "Theft",
    complaintSubject: "Stolen bike",
    complaintDescription: "Bike was stolen from my house.",
    dateAndTime: "2022-05-10 10:30:00",
    location: complaintLocation,
    party: complaintParty,
    officeToFileComplaint: "ABC Police Station",
    ipc: "379",
    status: "Pending",
    remarks: "Investigation in progress",
  };

  beforeEach(async function () {
    [owner, user1, user2, policeStation, policeSuperior, judiciary] =
      await ethers.getSigners();
  });

  before(async function () {
    const Complaint = await ethers.getContractFactory("Complaint");
    complaintContract = await Complaint.deploy();
    await complaintContract.deployed();
  });

  it("Should add complaint", async function () {
    await complaintContract.addComplaint(complaintDetails);
    const complaint = await complaintContract.getComplaintDetails(0);
    expect(complaint.complaintId).to.equal(0);
    expect(complaint.complaintNature).to.equal(
      complaintDetails.complaintNature
    );
    expect(complaint.placeOfIncident).to.equal(
      complaintDetails.placeOfIncident
    );
    expect(complaint.dateAndTime).to.equal(complaintDetails.dateAndTime);
    expect(complaint.policeStation).to.equal(complaintDetails.policeStation);
    expect(complaint.officeToFileComplaint).to.equal(
      complaintDetails.officeToFileComplaint
    );
    expect(complaint.district).to.equal(complaintDetails.district);
    expect(complaint.complaintDescription).to.equal(
      complaintDetails.complaintDescription
    );
    expect(complaint.status).to.equal(complaintDetails.status);
    expect(complaint.remarks).to.equal(complaintDetails.remarks);
  });

  it("Should update complaint", async function () {
    const updatedComplaint = {
      complaintId: 0,
      complaintNature: "Robbery",
      placeOfIncident: "Mumbai",
      dateAndTime: "2023-04-19 16:00",
      policeStation: "Andheri",
      officeToFileComplaint: "Deputy Commissioner of Police",
      district: "Mumbai Suburban",
      complaintDescription:
        "My purse was snatched while I was walking on the street",
      status: "In Progress",
      remarks: "Police is investigating the matter",
    };

    await complaintContract.updateComplaint(0, updatedComplaint);
    const complaint = await complaintContract.getComplaintDetails(0);
    expect(complaint.complaintId).to.equal(0);
    expect(complaint.complaintNature).to.equal(
      updatedComplaint.complaintNature
    );
    expect(complaint.placeOfIncident).to.equal(
      updatedComplaint.placeOfIncident
    );
    expect(complaint.dateAndTime).to.equal(updatedComplaint.dateAndTime);
    expect(complaint.policeStation).to.equal(updatedComplaint.policeStation);
    expect(complaint.officeToFileComplaint).to.equal(
      updatedComplaint.officeToFileComplaint
    );
    expect(complaint.district).to.equal(updatedComplaint.district);
    expect(complaint.complaintDescription).to.equal(
      updatedComplaint.complaintDescription
    );
    expect(complaint.complaintDescription).to.equal(
      updatedComplaint.complaintDescription
    );
    expect(complaint.status).to.equal(updatedComplaint.status);
    expect(complaint.remarks).to.equal(updatedComplaint.remarks);
  });
});
