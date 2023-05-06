const { assert, expect } = require("chai");

describe("Police", async function () {
  let PoliceContract, owner, station, superior;

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
      "Pump",
      "Rural",
      234234234,
      "N",
      "S"
    );
    const PoliceStation = await PoliceContract.policeStations(station.address);
    assert.equal(PoliceStation.name, "John Doe");
    assert.equal(PoliceStation.addr, "Kulathupuzha");
    assert.equal(PoliceStation.district, "Kollam");
    assert.equal(PoliceStation.landmark, "Pump");
    assert.equal(PoliceStation.stationType, "Rural");
    assert.equal(PoliceStation.mobile, 234234234);
    assert.equal(PoliceStation.nameOfCI, "N");
    assert.equal(PoliceStation.nameOfSI, "S");
    assert.equal(PoliceStation.approved, false);
    assert.equal(PoliceStation.approvedBy, ethers.constants.AddressZero);
  });

  it("should approve the police station", async function () {
    // Inherit from Superior Contract
    await PoliceContract.connect(owner).addApprovedProfile(
      "John Doe",
      "john.doe@example.com",
      1234567890,
      2234234,
      "Inspector",
      "Patrol",
      "Central Station",
      superior.address
    );

    await PoliceContract.connect(superior).approveStationProfile(
      station.address,
      true
    );

    const [
      name,
      addr,
      district,
      landmark,
      stationType,
      mobile,
      nameOfCI,
      nameOfSi,
      approved,
      approvedBy,
    ] = await PoliceContract.connect(station).getStationDetails();
    expect(approved).to.be.true;
    expect(approvedBy).to.equal(superior.address);
  });

  it("should update station profile", async function () {
    await PoliceContract.connect(station).updateStationProfile(
      "John Doe",
      "Kulathupuzha",
      "Kollam",
      "Pump",
      "Rural",
      234234234,
      "N",
      "S"
    );
    const updatedStation = await PoliceContract.policeStations(station.address);
    assert.equal(updatedStation.name, "John Doe");
    assert.equal(updatedStation.addr, "Kulathupuzha");
    assert.equal(updatedStation.district, "Kollam");
    assert.equal(updatedStation.landmark, "Pump");
    assert.equal(updatedStation.stationType, "Rural");
    assert.equal(updatedStation.mobile, 234234234);
    assert.equal(updatedStation.nameOfCI, "N");
    assert.equal(updatedStation.nameOfSI, "S");
    assert.equal(updatedStation.approved, true);
  });

  it("should return all police stations", async function () {
    const stations = await PoliceContract.getAllPoliceStations();
    expect(stations).to.have.lengthOf(1);
  });
});
