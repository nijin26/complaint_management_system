// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract ComplaintContract is PermissionsEnumerable {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant USER = keccak256("USER");
    bytes32 public constant STATION = keccak256("STATION");
    bytes32 public constant SUPERIOR = keccak256("SUPERIOR");

        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct Complaint {
        string complaintID;
        string stationID;
        address complainantWalletAddress;
        address stationWalletAddress;
        string complaintCreatedAt;
        string complaintValidatedAt;
        string detailsIPFSCID;
        string remarks;
        string status;
    }

    struct Report {
        string reportType;
        string reportID;
        string complaintID;
        string complaintType;
        string stationID;
        address stationWalletAddress;
        address complainantWalletAddress;
        uint256 reportDateTime;
        string reportDetailsIPFSCID;
    }

    struct ChargeSheet {
        string chargeSheetDateTime;
        string chargeSheetID;
        string complaintID;
        string reportID;
        string stationID;
        address stationWalletAddress;
        address complainantWalletAddress;
        string chargeSheetIPFSCID;
    }

    Complaint[] public complaints;
    Report[] public reports;
    ChargeSheet[] public chargeSheets;

    function addComplaint(Complaint memory newComplaint) public {
        complaints.push(newComplaint);
        // grantRole(USER,_userAddress);
    }
    
 function updateComplaint(string memory id, string memory status, string memory remarks) public {
        for (uint256 i = 0; i < complaints.length; i++) {
            if (compareStrings(complaints[i].complaintID, id)) {
                complaints[i].status = status;
                complaints[i].remarks = remarks;
                break;
            }
        }
    }

    function getComplaints() public view returns (Complaint[] memory) {
        return complaints;
    }

    function getComplaintByID(
        string memory _complaintID
    ) public view returns (Complaint memory) {
        for (uint256 i = 0; i < complaints.length; i++) {
            if (
                keccak256(bytes(complaints[i].complaintID)) ==
                keccak256(bytes(_complaintID))
            ) {
                return complaints[i];
            }
        }
    }


    function registerReport(Report memory newReport) public {
        reports.push(newReport);
    }

    function getReport(
        string memory id,
        bool isReportID
    ) public view returns (Report memory) {
        bytes32 idHash = keccak256(bytes(id));

        for (uint256 i = 0; i < reports.length; i++) {
            if (isReportID) {
                if (compareStrings(reports[i].reportID,id)){
                    return reports[i];
                }
            } else {
                if (compareStrings(reports[i].complaintID,id)){
                    return reports[i];
                }
            }
        }
        revert("Report not found");
    }

    function registerChargeSheet(ChargeSheet memory data) public {
        chargeSheets.push(data);
    }

    function getChargeSheet(
        string memory id
    ) public view returns (ChargeSheet memory) {
        for (uint256 i = 0; i < chargeSheets.length; i++) {
            if (
                compareStrings(chargeSheets[i].chargeSheetID, id) ||
                compareStrings(chargeSheets[i].complaintID, id) ||
                compareStrings(chargeSheets[i].reportID, id)
            ) {
                return chargeSheets[i];
            }
        }
        revert("Charge sheet not found");
    }

    function compareStrings(
        string memory a,
        string memory b
    ) internal pure returns (bool) {
        return (keccak256(bytes(a)) == keccak256(bytes(b)));
    }
}
