const { expect } = require("chai");

describe("UserProfile", function () {
  let owner;
  let userProfile;

  beforeEach(async function () {
    // Get the owner address
    [owner] = await ethers.getSigners();

    // Deploy the contract
    const UserProfile = await ethers.getContractFactory("UserProfile");
    userProfile = await UserProfile.deploy();

    // Set up the user's profile
    const profileInfo = {
      profile: {
        name: "John Doe",
        email: "johndoe@example.com",
        mobile: 1234567890,
        age: 30,
        gender: "Male",
        dob: "01/01/1990",
        addr: "123 Main St",
        city: "Anytown",
        district: "Kollam",
        state: "CA",
        pincode: 12345,
      },
      idDetails: {
        selectedID: "Driver's License",
        IDNumber: "123456789",
      },
      relativeDetails: {
        relativeName: "Jane Doe",
        relativeMobile: 0987654321,
        relation: "Spouse",
      },
    };
    await userProfile.connect(owner).setProfile(profileInfo);
  });

  it("should return the user's profile", async function () {
    const profileInfo = await userProfile.connect(owner).getUserProfile();
    expect(profileInfo.profile.name).to.equal("John Doe");
    expect(profileInfo.profile.email).to.equal("johndoe@example.com");
    expect(profileInfo.profile.mobile).to.equal(1234567890);
    expect(profileInfo.profile.age).to.equal(30);
    expect(profileInfo.profile.gender).to.equal("Male");
    expect(profileInfo.profile.dob).to.equal("01/01/1990");
    expect(profileInfo.profile.addr).to.equal("123 Main St");
    expect(profileInfo.profile.city).to.equal("Anytown");
    expect(profileInfo.profile.district).to.equal("Kollam");
    expect(profileInfo.profile.state).to.equal("CA");
    expect(profileInfo.profile.pincode).to.equal(12345);

    expect(profileInfo.idDetails.selectedID).to.equal("Driver's License");
    expect(profileInfo.idDetails.IDNumber).to.equal("123456789");

    expect(profileInfo.relativeDetails.relativeName).to.equal("Jane Doe");
    expect(profileInfo.relativeDetails.relativeMobile).to.equal(0987654321);
    expect(profileInfo.relativeDetails.relation).to.equal("Spouse");
  });

  it("should throw an error if user profile is not set", async function () {
    const UserProfile = await ethers.getContractFactory("UserProfile");
    const userProfileWithoutProfile = await UserProfile.deploy();

    await expect(
      userProfileWithoutProfile.connect(owner).getUserProfile()
    ).to.be.revertedWith("User details not found");
  });
});
