const { expect } = require("chai");

describe("ComplaintContract", function () {
  let ComplaintContract;
  let contract;
  let user;
  let policeStation;

  beforeEach(async function () {
    ComplaintContract = await ethers.getContractFactory("ComplaintContract");
    contract = await ComplaintContract.deploy();
    await contract.deployed();

    [user, policeStation] = await ethers.getSigners();
    await contract.assignPoliceStation(policeStation.address);
  });

  describe("addComplaint()", function () {
    it("should add a new complaint", async function () {
      const complaint = {
        complaintNature: "Test Complaint",
        casteCategory: "General",
        placeOfIncident: "Test Location",
        dateAndTime: "2023-03-23",
        policeStation: "Test Station",
        officeToFileComplaint: "Test Office",
        district: "Test District",
        complaintDescription: "This is a test complaint.",
        status: "Pending",
        remarks: "No remarks.",
      };

      await contract.connect(user).addComplaint(complaint);

      const addedComplaint = await contract.getComplaint(0);
      expect(addedComplaint.complaintNature).to.equal(
        complaint.complaintNature
      );
      expect(addedComplaint.casteCategory).to.equal(complaint.casteCategory);
      expect(addedComplaint.placeOfIncident).to.equal(
        complaint.placeOfIncident
      );
      expect(addedComplaint.dateAndTime).to.equal(complaint.dateAndTime);
      expect(addedComplaint.policeStation).to.equal(complaint.policeStation);
      expect(addedComplaint.officeToFileComplaint).to.equal(
        complaint.officeToFileComplaint
      );
      expect(addedComplaint.district).to.equal(complaint.district);
      expect(addedComplaint.complaintDescription).to.equal(
        complaint.complaintDescription
      );
      expect(addedComplaint.status).to.equal(complaint.status);
      expect(addedComplaint.remarks).to.equal(complaint.remarks);
    });

    it("should revert if a non-user tries to add a complaint", async function () {
      const complaint = {
        complaintNature: "Test Complaint",
        casteCategory: "General",
        placeOfIncident: "Test Location",
        dateAndTime: "2023-03-23",
        policeStation: "Test Station",
        officeToFileComplaint: "Test Office",
        district: "Test District",
        complaintDescription: "This is a test complaint.",
        status: "Pending",
        remarks: "No remarks.",
      };

      await expect(contract.addComplaint(complaint)).to.be.revertedWith(
        "Only a user can perform this action"
      );
    });
    describe("updateComplaintStatus", function () {
      it("should update the status and remarks of a complaint", async function () {
        const contract = await ComplaintContract.deployed();
        const complaint = {
          complaintNature: "Nature",
          casteCategory: "Category",
          placeOfIncident: "Place",
          dateAndTime: "Date",
          policeStation: "Police",
          officeToFileComplaint: "Office",
          district: "District",
          complaintDescription: "Description",
          status: "",
          remarks: "",
        };
        await contract.addComplaint(complaint);
        await contract.updateComplaintStatus(
          0,
          "Registered",
          "Complaint Registered Successfully"
        );
        const updatedComplaint = await contract.getComplaint(0);
        assert.equal(
          updatedComplaint.status,
          "Registered",
          "Status not updated correctly"
        );
        assert.equal(
          updatedComplaint.remarks,
          "Complaint Registered Successfully",
          "Remarks not updated correctly"
        );
      });

      it("should not update the status and remarks of a non-existent complaint", async function () {
        const contract = await ComplaintContract.deployed();
        await expectRevert(
          contract.updateComplaintStatus(
            1,
            "Registered",
            "Complaint Registered Successfully"
          ),
          "Complaint does not exist"
        );
      });

      it("should only allow police station to update the status and remarks of a complaint", async function () {
        const contract = await ComplaintContract.deployed();
        await expectRevert(
          contract.updateComplaintStatus(
            0,
            "Registered",
            "Complaint Registered Successfully",
            { from: accounts[1] }
          ),
          "Only a police station can perform this action"
        );
      });
    });
  });
});
