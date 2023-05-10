import { writable } from "svelte/store";

let selectedAddress = "";
selectedAddress = window.ethereum.selectedAddress || "";

export const metamask = writable({
  connected: selectedAddress ? true : false,
  address: selectedAddress ? selectedAddress : "",
});

export const profileType = writable("");

const currentProfileType = localStorage.getItem("profileType");

if (currentProfileType && currentProfileType !== "") {
  profileType.set(currentProfileType);
}
