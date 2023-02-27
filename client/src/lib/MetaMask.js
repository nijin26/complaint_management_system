import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

let provider;
let signer;
let address;

export const connectToMetaMask = async () => {
  if (window.ethereum) {
    try {
      provider = new Web3Provider(window.ethereum, "any");
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      address = await signer.getAddress();
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Please install Metamask (Chrome Extension)");
  }
};
