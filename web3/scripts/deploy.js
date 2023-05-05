const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const User = await ethers.getContractFactory("User");
  const user = await User.deploy();
  await user.deployed();

  const Complaint = await ethers.getContractFactory("Complaint");
  const complaint = await Complaint.deploy();
  await complaint.deployed();

  const PoliceSuperior = await ethers.getContractFactory("PoliceSuperior");
  const policeSuperior = await PoliceSuperior.deploy();
  await policeSuperior.deployed();

  const Police = await ethers.getContractFactory("Police");
  const police = await Police.deploy();
  await police.deployed();

  console.log("User contract deployed to:", user.address);
  console.log("Complaint contract deployed to:", complaint.address);
  console.log("PoliceSuperior contract deployed to:", policeSuperior.address);
  console.log("Police contract deployed to:", police.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
