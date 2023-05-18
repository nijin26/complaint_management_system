const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const Complaint = await ethers.getContractFactory("Complaint");
  const complaint = await Complaint.deploy();
  await complaint.deployed();

  const PoliceSuperior = await ethers.getContractFactory("PoliceSuperior");
  const policeSuperior = await PoliceSuperior.deploy();
  await policeSuperior.deployed();

  const Police = await ethers.getContractFactory("Police");
  const police = await Police.deploy();
  await police.deployed();

  const User = await ethers.getContractFactory("User");
  const user = await User.deploy();
  await user.deployed();

  console.log("Complaint contract deployed to:", complaint.address);
  console.log("PoliceSuperior contract deployed to:", policeSuperior.address);
  console.log("Police contract deployed to:", police.address);
  console.log("User contract deployed to:", user.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// const { ethers, upgrades } = require("hardhat");

// async function main() {
//   // Deploy Contract A
//   const ContractA = await ethers.getContractFactory("ContractA");
//   const contractA = await ContractA.deploy();
//   await contractA.deployed();
//   console.log("Contract A deployed:", contractA.address);

//   // Deploy Contract B by passing the address of Contract A
//   const ContractB = await ethers.getContractFactory("ContractB");
//   const contractB = await ContractB.deploy(contractA.address);
//   await contractB.deployed();
//   console.log("Contract B deployed:", contractB.address);

//   // Deploy Contract C by passing the address of Contract B
//   const ContractC = await ethers.getContractFactory("ContractC");
//   const contractC = await ContractC.deploy(contractB.address);
//   await contractC.deployed();
//   console.log("Contract C deployed:", contractC.address);

//   // ... Repeat the process for any additional contracts

//   // You can access the contracts and interact with them as needed
//   // For example:
//   // const contractAInstance = await ContractA.attach(contractA.address);
//   // const contractBInstance = await ContractB.attach(contractB.address);
//   // const contractCInstance = await ContractC.attach(contractC.address);

//   // ... Perform additional operations or testing

//   // End the script
//   process.exit(0);
// }

// // Run the deployment script
// main().catch((error) => {
//   console.error(error);
//   process.exit(1);
// });

// contract B {
//     A public contractA;

//     constructor(address _contractA) {
//         contractA = A(_contractA);
//     }

//     function updateMappingInA(address _addr, bool _value) public {
//         contractA.updateMapping(_addr, _value);
//     }
// }
