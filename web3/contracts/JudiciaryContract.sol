
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";
import "./ComplaintContract.sol";

contract JudiciaryContract is PermissionsEnumerable{
    bytes32 public constant JUDICIARY = keccak256("JUDICIARY");

    ComplaintContract private complaintContract;

    constructor(address complaintContractAddress) {
        complaintContract = ComplaintContract(complaintContractAddress);
        _setupRole(DEFAULT_ADMIN_ROLE,msg.sender); 
    }

function getComplaintByID(string memory id) public view returns (ComplaintContract.Complaint memory) {
        return complaintContract.getComplaintByID(id);
    }

}
