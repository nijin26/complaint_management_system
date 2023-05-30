import { writable } from "svelte/store";

let selectedAddress = "";
selectedAddress = window.ethereum.selectedAddress || "";

// export const globalWallet = writable(null);

export const metamask = writable({
  connected: selectedAddress ? true : false,
  address: selectedAddress ? selectedAddress : "",
});
export const profileType = writable("");

// if (selectedAddress) {
//   getUserRole();
// }
