const { assert, expect } = require("chai");

describe("Police", async function () {
  let PoliceContract, SuperiorContract, ComplaintContract, station, superior;

  before(async function () {
    [owner, station, superior] = await ethers.getSigners();
    // console.log(await ethers.getSigners(), "Signers");
    console.log("Owner", owner.address);
    console.log("Station", station.address);
    console.log("Superior", superior.address);

    // const Complaint = await ethers.getContractFactory("Complaint");
    // ComplaintContract = await Complaint.connect(owner).deploy();
    // await ComplaintContract.deployed();

    // const PoliceSuperior = await ethers.getContractFactory("PoliceSuperior");
    // SuperiorContract = await PoliceSuperior.connect(owner).deploy();
    // await SuperiorContract.deployed();

    const PoliceStation = await ethers.getContractFactory("Police");
    PoliceContract = await PoliceStation.connect(owner).deploy();
    await PoliceContract.deployed();
  });

  it("should create a profile", async function () {
    await PoliceContract.connect(station).createStationProfile(
      "John Doe",
      "Kulathupuzha",
      "Kollam",
      "Rural",
      "Near Govt hospital",
      1234567890
    );
    const PoliceStation = await PoliceContract.policeStations(station.address);
    assert.equal(PoliceStation.name, "John Doe");
    assert.equal(PoliceStation.location, "Kulathupuzha");
    assert.equal(PoliceStation.district, "Kollam");
    assert.equal(PoliceStation.stationType, "Rural");
    assert.equal(PoliceStation.addr, "Near Govt hospital");
    assert.equal(PoliceStation.mobile, 1234567890);
    assert.equal(PoliceStation.approved, false);
    assert.equal(PoliceStation.approvedBy, ethers.constants.AddressZero);
  });

  it("should approve the police station", async function () {
    await PoliceContract.connect(owner).addApprovedProfile(
      // Inherit from Superior Contract
      "Superior1",
      "superior1@example.com",
      1234567890,
      "Rank1",
      "Designation1",
      "Unit1",
      superior.address
    );

    // const detailsOfSuperior = await SuperiorContract.connect(
    //   superior
    // ).getProfileDetails();
    // console.log(detailsOfSuperior, "details of superior");

    const approvedStation = await PoliceContract.connect(
      superior
    ).approveStationProfile(station.address, true);

    const isPoliceSuperior = await PoliceContract.isPoliceSuperior(
      superior.address
    );
    // const detailsOfSuperior = await SuperiorContract.policeSuperiors(
    //   superior.address
    // );

    const detailsOfStation = await PoliceContract.policeStations(
      station.address
    );

    console.log("is police superior", isPoliceSuperior);
    // console.log("Details of Superior", detailsOfSuperior);
    console.log("Details of station", detailsOfStation);

    // const [
    //   name,
    //   location,
    //   district,
    //   stationType,
    //   mobile,
    //   addr,
    //   approved,
    //   approvedBy,
    // ] = await PoliceContract.connect(station).getProfileDetails();
    // expect(approved).to.be.true;
    // expect(approvedBy).to.equal(superior.address);
  });

  // it("should update a profile", async function () {
  //   await PoliceContract.connect(owner).updateProfile(
  //     "Nijin",
  //     "Kulathupuzha",
  //     "Kollam",
  //     "Rural",
  //     "Near Govt hospital",
  //     2323
  //   );
  //   const updatedStation = await PoliceContract.policeStations(station.address);
  //   console.log(updatedStation);
  //   assert.equal(updatedStation.name, "Nijin");
  //   assert.equal(updatedStation.location, "Kulathupuzha");
  //   assert.equal(updatedStation.district, "Kollam");
  //   assert.equal(updatedStation.stationType, "Rural");
  //   assert.equal(updatedStation.addr, "Near Govt hospital");
  //   assert.equal(updatedStation.mobile, 2323);
  //   assert.equal(updatedStation.approved, false);
  //   assert.equal(updatedStation.approvedBy, ethers.constants.AddressZero);
  // });
});
