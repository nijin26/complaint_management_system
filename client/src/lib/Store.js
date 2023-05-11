import { writable } from "svelte/store";
import { connectingWithComplaint } from "./Contract";

let selectedAddress = "";
let selectedUserRole = "";
selectedAddress = window.ethereum.selectedAddress || "";

if (selectedAddress) {
  const complaintContract = await connectingWithComplaint();
  selectedUserRole = await complaintContract.getUserRole();
  console.log(selectedUserRole);
}
console.log(selectedUserRole, "selectedUser Role");

export const metamask = writable({
  connected: selectedAddress ? true : false,
  address: selectedAddress ? selectedAddress : "",
});

export const profileType = writable("");

const currentProfileType = localStorage.getItem("profileType");

if (currentProfileType && currentProfileType !== "") {
  profileType.set(currentProfileType);
}
