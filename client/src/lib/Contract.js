import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";

import {
  complaintAddress,
  ComplaintABI,
  policeSuperiorAddress,
  policeSuperiorABI,
  policeAddress,
  policeABI,
  userAddress,
  userABI,
} from "../../../web3/Context/constants";

//CHECK IF WALLET IS CONNECTED
export const checkIfWalletConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

export const connectToWallet = async () => {
  try {
    if (!window.ethereum) return console.log("Install MetaMask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.log(error);
  }
};

// <<<<< FETCHING CONTRACTS >>>>>>>>>>

// Complaint contract fetching
export const fetchComplaintContract = (signerOrProvider) =>
  new ethers.Contract(complaintAddress, ComplaintABI, signerOrProvider);

// CONNECTING WITH SuperiorCONTRACT
export const connectingWithComplaint = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchComplaintContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// Superior contract fetching
export const fetchSuperiorContract = (signerOrProvider) =>
  new ethers.Contract(
    policeSuperiorAddress,
    policeSuperiorABI,
    signerOrProvider
  );

// CONNECTING WITH SuperiorCONTRACT
export const connectingWithSuperior = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchSuperiorContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

// Police contract fetching
export const fetchPoliceContract = (signerOrProvider) =>
  new ethers.Contract(policeAddress, policeABI, signerOrProvider);

// CONNECTING WITH POLICE/STATION CONTRACT
export const connectingWithPolice = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = fetchPoliceContract(signer);
    return contract;
  } catch (error) {
    console.log(error);
  }
};

export const setProfile = async (profileInfo) => {
  console.log("Set profile function in svelte is called");
  if (!window.ethereum) {
    console.log("Window ethereum not exist");
    return;
  }

  try {
    console.log("Inside try block");
    const provider = new Web3Provider(window.ethereum, "any");
    const signer = provider.getSigner();

    const Contract = new ethers.Contract(userAddress, userABI, signer);

    const gasLimit = await Contract.estimateGas.setProfile(profileInfo);
    console.log("Estimated gas limit:", gasLimit.toNumber());

    console.log("Contract is created", Contract);
    console.log("Profile info is", profileInfo);
    const newProfile = await Contract.setProfile(profileInfo, {
      gasLimit: gasLimit,
    });
    // await newProfile.wait();
    console.log(await newProfile.wait());
  } catch (err) {
    console.log(err.message, "Error while setting profile");
  }
};

export const viewProfile = async () => {
  if (!window.ethereum) {
    console.log("Window ethereum not exist");
    return;
  }

  try {
    const provider = new Web3Provider(window.ethereum, "any");

    const Contract = new ethers.Contract(userAddress, userABI, provider);

    const profileInfo = await Contract.getUserProfile();
    console.log(profileInfo, "Profile");
    // return profile;
  } catch (err) {
    console.log(err.message, "Error while viewing profile");
  }
};

// export const connectToMetaMask = async () => {
//   if (window.ethereum) {
//     try {
//       const provider = new Web3Provider(window.ethereum, "any");
//       await provider.send("eth_requestAccounts", []);
//     } catch (err) {
//       console.log(err);
//     }
//   } else {
//     alert("Please install Metamask (Chrome Extension)");
//   }
// };
