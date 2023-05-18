import {
  connectingWithComplaint,
  connectingWithPolice,
  connectingWithSuperior,
  connectingWithUser,
} from "./Contract";
import { profileType } from "./Store";

export const getUserRole = async () => {
  console.log("Get user role is called");
  const stationContract = await connectingWithPolice();
  const superiorContract = await connectingWithSuperior();
  //   const userContract = await connectingWithUser();

  //USER ROLES
  const isPoliceStation = await stationContract.isPoliceStationRole();
  const isPoliceSuperior = await superiorContract.isPoliceSuperiorRole();
  const isUser = false;

  if (isPoliceStation) {
    profileType.set("STATION");
    localStorage.setItem("profileType", "STATION");
  }

  if (isPoliceSuperior) {
    profileType.set("SUPERIOR");
    localStorage.setItem("profileType", "SUPERIOR");
  }

  if (isUser) {
    profileType.set("USER");
    localStorage.setItem("profileType", "USER");
  }
};
