const { assert, expect } = require("chai");

describe("Police", async function () {
  let PoliceContract, station, superior;

  before(async function () {
    [owner, station, superior] = await ethers.getSigners();
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
    // Inherit from Superior Contract
    await PoliceContract.connect(owner).addApprovedProfile(
      "Superior1",
      "superior1@example.com",
      1234567890,
      "Rank1",
      "Designation1",
      "Unit1",
      superior.address
    );

    await PoliceContract.connect(superior).approveStationProfile(
      station.address,
      true
    );

    const [
      name,
      location,
      district,
      stationType,
      addr,
      mobile,
      approved,
      approvedBy,
    ] = await PoliceContract.connect(station).getStationDetails();
    expect(approved).to.be.true;
    expect(approvedBy).to.equal(superior.address);
  });

  it("should update station profile", async function () {
    await PoliceContract.connect(station).updateStationProfile(
      "Nijin",
      "Kulathupuzha",
      "Kollam",
      "Rural",
      "Near Govt hospital",
      2323
    );
    const updatedStation = await PoliceContract.policeStations(station.address);
    assert.equal(updatedStation.name, "Nijin");
    assert.equal(updatedStation.location, "Kulathupuzha");
    assert.equal(updatedStation.district, "Kollam");
    assert.equal(updatedStation.stationType, "Rural");
    assert.equal(updatedStation.addr, "Near Govt hospital");
    assert.equal(updatedStation.mobile, 2323);
  });
});
