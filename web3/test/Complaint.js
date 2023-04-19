// test/complaint.test.js

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Complaint", function () {
  let complaintContract;

  const complaint1 = {
    complaintId: 0,
    complaintNature: "Theft",
    casteCategory: "General",
    placeOfIncident: "New Delhi",
    dateAndTime: "2023-04-19 14:00",
    policeStation: "Rajouri Garden",
    officeToFileComplaint: "Sub-Divisional Magistrate",
    district: "West Delhi",
    complaintDescription: "My bike was stolen from outside my house",
    status: "Pending",
    remarks: "Good",
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
    await complaintContract.addComplaint(complaint1);
    const complaint = await complaintContract.getComplaintDetails(0);
    expect(complaint.complaintId).to.equal(0);
    expect(complaint.complaintNature).to.equal(complaint1.complaintNature);
    expect(complaint.casteCategory).to.equal(complaint1.casteCategory);
    expect(complaint.placeOfIncident).to.equal(complaint1.placeOfIncident);
    expect(complaint.dateAndTime).to.equal(complaint1.dateAndTime);
    expect(complaint.policeStation).to.equal(complaint1.policeStation);
    expect(complaint.officeToFileComplaint).to.equal(
      complaint1.officeToFileComplaint
    );
    expect(complaint.district).to.equal(complaint1.district);
    expect(complaint.complaintDescription).to.equal(
      complaint1.complaintDescription
    );
    expect(complaint.status).to.equal(complaint1.status);
    expect(complaint.remarks).to.equal(complaint1.remarks);
  });

  it("Should update complaint", async function () {
    const updatedComplaint = {
      complaintId: 0,
      complaintNature: "Robbery",
      casteCategory: "Scheduled Caste",
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
    expect(complaint.casteCategory).to.equal(updatedComplaint.casteCategory);
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
