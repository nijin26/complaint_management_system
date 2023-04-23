const { assert, expect } = require("chai");

describe("Police", async function () {
  let PoliceContract;

  before(async function () {
    [owner, station, superior] = await ethers.getSigners();

    const PoliceStation = await ethers.getContractFactory("Police");
    PoliceContract = await PoliceStation.connect(owner).deploy();
    await PoliceContract.deployed();
  });

  it("should create a profile", async function () {
    await PoliceContract.connect(station).createProfile(
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

  it("should update a profile", async function () {
    await PoliceContract.connect(owner).updateProfile(
      "Nijin",
      "Kulathupuzha",
      "Kollam",
      "Rural",
      "Near Govt hospital",
      2323
    );
    const updatedStation = await PoliceContract.policeStations(station.address);
    console.log(updatedStation);
    assert.equal(updatedStation.name, "Nijin");
    assert.equal(updatedStation.location, "Kulathupuzha");
    assert.equal(updatedStation.district, "Kollam");
    assert.equal(updatedStation.stationType, "Rural");
    assert.equal(updatedStation.addr, "Near Govt hospital");
    assert.equal(updatedStation.mobile, 2323);
    assert.equal(updatedStation.approved, false);
    assert.equal(updatedStation.approvedBy, ethers.constants.AddressZero);
  });
});
