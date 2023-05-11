// test/complaint.test.js

const { expect } = require("chai");

describe("Complaint", function () {
  let complaintContract,
    owner,
    complainant,
    witness,
    accused,
    policeStation,
    complaintDetails;

  before(async function () {
    [owner, complainant, witness, accused, policeStation] =
      await ethers.getSigners();

    const complaintParty = {
      complainant: complainant.address,
      policeStation: policeStation.address,
      witness: witness.address,
      accused: accused.address,
    };

    const complaintLocation = {
      placeOfIncident: "ABC",
      landmark: "XYZ",
      district: "MNO",
    };

    complaintDetails = {
      complaintId: 0,
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
    expect(complaint.complaintSubject).to.equal(
      complaintDetails.complaintSubject
    );
    expect(complaint.complaintDescription).to.equal(
      complaintDetails.complaintDescription
    );
    expect(complaint.dateAndTime).to.equal(complaintDetails.dateAndTime);

    expect(complaint["location"].placeOfIncident).to.equal(
      complaintDetails.location.placeOfIncident
    );
    expect(complaint["location"].landmark).to.equal(
      complaintDetails.location.landmark
    );
    expect(complaint["location"].district).to.equal(
      complaintDetails.location.district
    );

    expect(complaint["party"].complainant).to.equal(
      complaintDetails.party.complainant
    );
    expect(complaint["party"].policeStation).to.equal(
      complaintDetails.party.policeStation
    );
    expect(complaint["party"].witness).to.equal(complaintDetails.party.witness);
    expect(complaint.party.accused).to.equal(complaintDetails.party.accused);

    expect(complaint.officeToFileComplaint).to.equal(
      complaintDetails.officeToFileComplaint
    );

    expect(complaint.ipc).to.equal(complaintDetails.ipc);

    expect(complaint.status).to.equal(complaintDetails.status);
    expect(complaint.remarks).to.equal(complaintDetails.remarks);
  });

  it("Should update complaint", async function () {
    await complaintContract.updateComplaint(0, complaintDetails);
    const complaint = await complaintContract.getComplaintDetails(0);

    expect(complaint.complaintId).to.equal(0);

    expect(complaint.complaintNature).to.equal(
      complaintDetails.complaintNature
    );
    expect(complaint.complaintSubject).to.equal(
      complaintDetails.complaintSubject
    );
    expect(complaint.complaintDescription).to.equal(
      complaintDetails.complaintDescription
    );
    expect(complaint.dateAndTime).to.equal(complaintDetails.dateAndTime);

    expect(complaint["location"].placeOfIncident).to.equal(
      complaintDetails.location.placeOfIncident
    );
    expect(complaint["location"].landmark).to.equal(
      complaintDetails.location.landmark
    );
    expect(complaint["location"].district).to.equal(
      complaintDetails.location.district
    );

    expect(complaint["party"].complainant).to.equal(
      complaintDetails.party.complainant
    );
    expect(complaint["party"].policeStation).to.equal(
      complaintDetails.party.policeStation
    );
    expect(complaint["party"].witness).to.equal(complaintDetails.party.witness);
    expect(complaint.party.accused).to.equal(complaintDetails.party.accused);

    expect(complaint.officeToFileComplaint).to.equal(
      complaintDetails.officeToFileComplaint
    );

    expect(complaint.ipc).to.equal(complaintDetails.ipc);

    expect(complaint.status).to.equal(complaintDetails.status);
    expect(complaint.remarks).to.equal(complaintDetails.remarks);
  });
});
