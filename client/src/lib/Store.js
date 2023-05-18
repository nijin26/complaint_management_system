import { writable } from "svelte/store";

import { connectingWithComplaint, connectingWithPolice } from "./Contract";
import { getUserRole } from "./GetUserRole";

let selectedAddress = "";
selectedAddress = window.ethereum.selectedAddress || "";

export const metamask = writable({
  connected: selectedAddress ? true : false,
  address: selectedAddress ? selectedAddress : "",
});
export const profileType = writable("");

if (selectedAddress) {
  getUserRole();
}
