const { expect } = require("chai");

describe("User Contract", function () {
  let userContract, owner, user1;

  beforeEach(async function () {
    [owner, user1] = await ethers.getSigners();
  });

  before(async function () {
    const User = await ethers.getContractFactory("User");
    userContract = await User.deploy();
    await userContract.deployed();
  });

  describe("createUser", function () {
    it("should create a new user profile", async function () {
      const basicDetails = {
        name: "John",
        email: "john@example.com",
        mobile: 1234567890,
        age: 30,
        gender: "Male",
        dob: "01/01/1990",
        addr: "123 Main St",
        city: "Anytown",
        district: "Anydistrict",
        state: "Anystate",
        pincode: 123456,
      };
      const idDetails = {
        selectedID: "Passport",
        IDNumber: "AB123456",
      };
      const relativeDetails = {
        relativeName: "Jane",
        relativeMobile: 9876543210,
        relation: "Spouse",
      };
      const profileInfo = {
        basicDetails,
        idDetails,
        relativeDetails,
      };

      await userContract.createUser(profileInfo);

      const userProfile = await userContract.getUserDetails(owner.address);

      expect(userProfile.basicDetails.name).to.equal(basicDetails.name);
      expect(userProfile.basicDetails.email).to.equal(basicDetails.email);
      expect(userProfile.basicDetails.mobile).to.equal(basicDetails.mobile);
      expect(userProfile.basicDetails.age).to.equal(basicDetails.age);
      expect(userProfile.basicDetails.gender).to.equal(basicDetails.gender);
      expect(userProfile.basicDetails.dob).to.equal(basicDetails.dob);
      expect(userProfile.basicDetails.addr).to.equal(basicDetails.addr);
      expect(userProfile.basicDetails.city).to.equal(basicDetails.city);
      expect(userProfile.basicDetails.district).to.equal(basicDetails.district);
      expect(userProfile.basicDetails.state).to.equal(basicDetails.state);
      expect(userProfile.basicDetails.pincode).to.equal(basicDetails.pincode);
      expect(userProfile.idDetails.selectedID).to.equal(idDetails.selectedID);
      expect(userProfile.idDetails.IDNumber).to.equal(idDetails.IDNumber);
      expect(userProfile.relativeDetails.relativeName).to.equal(
        relativeDetails.relativeName
      );
      expect(userProfile.relativeDetails.relativeMobile).to.equal(
        relativeDetails.relativeMobile
      );
      expect(userProfile.relativeDetails.relation).to.equal(
        relativeDetails.relation
      );
    });
  });

  describe("updateUserDetails", function () {
    it("should update an existing user profile", async function () {
      const basicDetails = {
        name: "John",
        email: "john@example.com",
        mobile: 1234567890,
        age: 30,
        gender: "Male",
        dob: "01/01/1990",
        addr: "123 Main St",
        city: "Anytown",
        district: "Anydistrict",
        state: "Anystate",
        pincode: 123456,
      };
      const idDetails = {
        selectedID: "Passport",
        IDNumber: "AB123456",
      };
      const relativeDetails = {
        relativeName: "Jane",
        relativeMobile: 9876543210,
        relation: "Spouse",
      };
      const profileInfo = {
        basicDetails,
        idDetails,
        relativeDetails,
      };
      await userContract.updateUserDetails(profileInfo);
      const userProfile = await userContract.getUserDetails(owner.address);
      expect(userProfile.basicDetails.name).to.equal(basicDetails.name);
      expect(userProfile.basicDetails.email).to.equal(basicDetails.email);
      expect(userProfile.basicDetails.mobile).to.equal(basicDetails.mobile);
      expect(userProfile.basicDetails.age).to.equal(basicDetails.age);
      expect(userProfile.basicDetails.gender).to.equal(basicDetails.gender);
      expect(userProfile.basicDetails.dob).to.equal(basicDetails.dob);
      expect(userProfile.basicDetails.addr).to.equal(basicDetails.addr);
      expect(userProfile.basicDetails.city).to.equal(basicDetails.city);
      expect(userProfile.basicDetails.district).to.equal(basicDetails.district);
      expect(userProfile.basicDetails.state).to.equal(basicDetails.state);
      expect(userProfile.basicDetails.pincode).to.equal(basicDetails.pincode);
      expect(userProfile.idDetails.selectedID).to.equal(idDetails.selectedID);
      expect(userProfile.idDetails.IDNumber).to.equal(idDetails.IDNumber);
      expect(userProfile.relativeDetails.relativeName).to.equal(
        relativeDetails.relativeName
      );
      expect(userProfile.relativeDetails.relativeMobile).to.equal(
        relativeDetails.relativeMobile
      );
      expect(userProfile.relativeDetails.relation).to.equal(
        relativeDetails.relation
      );
    });
  });
});
