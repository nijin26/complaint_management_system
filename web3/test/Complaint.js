const { expect } = require("chai");

describe("Complaint", function () {
  let complaintContract, complainant, owner, station, superior;

  before(async function () {
    [owner, complainant, station, superior] = await ethers.getSigners();
    const Complaint = await ethers.getContractFactory("Complaint");
    complaintContract = await Complaint.connect(owner).deploy();
    await complaintContract.deployed();
  });

  it("should create an user", async function () {
    const profileInfo = {
      basicDetails: {
        name: "John Doe",
        email: "johndoe@example.com",
        mobile: 1234567890,
        age: 25,
        gender: "Male",
        dob: "1998-05-10",
        addr: "123 Main Street",
        city: "New York",
        district: "ABC District",
        state: "New York",
        pincode: 12345,
      },
      idDetails: {
        selectedID: "Driver's License",
        IDNumber: "DL-123456789",
      },
      relativeDetails: {
        relativeName: "Jane Doe",
        relativeMobile: 9876543210,
        relation: "Spouse",
      },
    };
    const userCreated = await complaintContract
      .connect(complainant)
      .createUser(profileInfo);
    userCreated.wait();

    // const userType = await complaintContract.connect(complainant).getUserType();
    // console.log(userType, "ROLE");
    // const userDetails = await complaintContract
    //   .connect(complainant)
    //   .getUserDetails();
    // console.log(userDetails, "user details");
  });

  it("should create a superior profile", async function () {
    const superiorProfile = {
      name: "John Doe",
      email: "john.doe@example.com",
      mobile: 1234567890,
      aadharID: 123456789012,
      rank: "Inspector",
      designation: "Superintendent",
      unit: "XYZ Division",
      approved: false,
      approvedBy: ethers.constants.AddressZero,
    };
    console.log(superior.address);
    const superiorProfileCreated = await complaintContract
      .connect(superior)
      .createSuperiorProfile(superiorProfile);
    superiorProfileCreated.wait();

    const superiorIsApproved = await complaintContract.approvePoliceSuperior(
      superior.address
    );
    superiorIsApproved.wait();

    // const superiorDetails = await complaintContract
    //   .connect(superior)
    //   .getSuperiorProfileDetails();
  });

  it("Should create a station profile", async function () {
    const stationProfile = {
      name: "ABC Police Station",
      addr: "123 Main Street",
      district: "XYZ District",
      landmark: "Near City Park",
      stationType: "Local",
      mobile: 9876543210,
      nameOfCI: "John Smith",
      nameOfSI: "Jane Doe",
      approved: false,
      approvedBy: ethers.constants.AddressZero,
    };
    const stationProfileCreated = await complaintContract
      .connect(station)
      .createStationProfile(stationProfile);

    await complaintContract
      .connect(superior)
      .approveStationProfile(station.address);

    // const userDetails = await complaintContract
    //   .connect(station)
    //   .getStationDetails();
    // console.log(userDetails, "user details");

    it("Add complaint by user", async function () {
      const userComplaintDetails = {
        complaintNature: "Theft",
        complaintSubject: "Stolen Wallet",
        complaintDescription:
          "My wallet was stolen while traveling on the bus.",
        dateAndTime: "2023-05-20 15:30",
        placeOfIncident: "City Center",
        landmark: "Bus Stop",
        district: "ABC District",
        policeStation: "0x1234567890abcdef1234567890abcdef12345678",
        officeToFileComplaint: "Complaint Office 1",
      };

      const complaintAdded = await complaintContract
        .connect(complainant)
        .addComplaintByUser(userComplaintDetails);
    });
  });
});
