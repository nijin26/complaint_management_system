import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { userProfileABI } from "./ContractABI";

let CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const connectToMetaMask = async () => {
  if (window.ethereum) {
    try {
      const provider = new Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Please install Metamask (Chrome Extension)");
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

    const Contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      userProfileABI.abi,
      signer
    );

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

    const Contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      userProfileABI.abi,
      provider
    );

    const profileInfo = await Contract.getUserProfile();
    console.log(profileInfo, "Profile");
    // return profile;
  } catch (err) {
    console.log(err.message, "Error while viewing profile");
  }
};
