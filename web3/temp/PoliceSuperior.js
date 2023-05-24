const { assert, expect } = require("chai");

describe("PoliceSuperior", function () {
  let complaintContract, currentContract, owner, user1, user2;

  before(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    // const Complaint = await ethers.getContractFactory("Complaint");
    // complaintContract = await Complaint.connect(owner).deploy();
    // await complaintContract.deployed();

    const PoliceSuperior = await ethers.getContractFactory("PoliceSuperior");
    currentContract = await PoliceSuperior.connect(owner).deploy();
    await currentContract.deployed();
  });

  it("should create a profile", async function () {
    await currentContract.createProfile(
      "John Doe",
      "john.doe@example.com",
      1234567890,
      2234234,
      "Inspector",
      "Patrol",
      "Central Station"
    );
    const superior = await currentContract.policeSuperiors(owner.address);
    assert.equal(superior.name, "John Doe");
    assert.equal(superior.email, "john.doe@example.com");
    assert.equal(superior.mobile, 1234567890);
    assert.equal(superior.aadharID, 2234234);
    assert.equal(superior.rank, "Inspector");
    assert.equal(superior.designation, "Patrol");
    assert.equal(superior.unit, "Central Station");
    assert.equal(superior.approved, false);
    assert.equal(superior.approvedBy, ethers.constants.AddressZero);
  });

  it("should update profile", async function () {
    await currentContract.updateProfile(
      "Nijin",
      "Nijin@example.com",
      232323,
      2323,
      "CI",
      "Station",
      "Central Station"
    );

    const updatedSuperior = await currentContract.policeSuperiors(
      owner.address
    );
    assert.equal(updatedSuperior.name, "Nijin");
    assert.equal(updatedSuperior.email, "Nijin@example.com");
    assert.equal(updatedSuperior.mobile, 232323);
    assert.equal(updatedSuperior.aadharID, 2323);
    assert.equal(updatedSuperior.rank, "CI");
    assert.equal(updatedSuperior.designation, "Station");
    assert.equal(updatedSuperior.unit, "Central Station");
    assert.equal(updatedSuperior.approved, false);
    assert.equal(updatedSuperior.approvedBy, ethers.constants.AddressZero);
  });

  describe("approvePoliceSuperior", function () {
    it("should approve a police superior", async function () {
      await currentContract
        .connect(user1)
        .createProfile(
          "Superior1",
          "superior1@example.com",
          1234567890,
          2323,
          "Rank1",
          "Designation1",
          "Unit1"
        );

      // Only owner can approve a police superior
      await expect(
        currentContract
          .connect(user1)
          .approvePoliceSuperior(owner.address, true)
      ).to.be.revertedWith("Unauthorized");

      // An unapproved police superior can't approve another police superior
      await expect(
        currentContract
          .connect(user1)
          .approvePoliceSuperior(user2.address, true)
      ).to.be.revertedWith("Unauthorized");

      // Owner can approve a police superior
      await currentContract
        .connect(owner)
        .approvePoliceSuperior(user1.address, true);

      const [
        name,
        email,
        mobile,
        aadharID,
        rank,
        designation,
        unit,
        approved,
        approvedBy,
      ] = await currentContract.connect(user1).getProfileDetails();
      expect(approved).to.be.true;
      expect(approvedBy).to.equal(owner.address);
    });
  });
});
