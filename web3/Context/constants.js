import Complaint from "./Complaint.json";
import PoliceSuperior from "./PoliceSuperior.json";
import Police from "./Police.json";
import User from "./User.json";

// Deploying contracts with the account: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266

export const complaintAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
export const ComplaintABI = Complaint.abi;

export const policeSuperiorAddress =
  "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6";
export const policeSuperiorABI = PoliceSuperior.abi;

export const policeAddress = "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318";
export const policeABI = Police.abi;

export const userAddress = "0x0165878A594ca255338adfa4d48449f69242Eb8F";
export const userABI = User.abi;

// User contract deployed to: 0x0165878A594ca255338adfa4d48449f69242Eb8F
// Complaint contract deployed to: 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
// PoliceSuperior contract deployed to: 0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6
// Police contract deployed to: 0x8A791620dd6260079BF849Dc5567aDC3F2FdC318
