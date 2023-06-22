
// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract ComplaintContract is PermissionsEnumerable {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant USER = keccak256("USER");
    bytes32 public constant STATION = keccak256("STATION");
    bytes32 public constant SUPERIOR = keccak256("SUPERIOR");
    // bytes32 public constant JUDICIARY = keccak256("JUDICIARY");

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    struct Complaint {
        string complaintID;
        string stationID;
        address userAddress;
        address stationAddress;
        string complaintCreatedAt;
        string complaintApprovedAt;
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

    function addComplaint(
        string memory _complaintID,
        string memory _stationID,
        address _userAddress,
        address _stationAddress,
        string memory _complaintCreatedAt,
        string memory _complaintApprovedAt,
        string memory _detailsIPFSCID,
        string memory _remarks,
        string memory _status
    ) public {
        Complaint memory newComplaint = Complaint(
            _complaintID,
            _stationID,
            _userAddress,
            _stationAddress,
            _complaintCreatedAt,
            _complaintApprovedAt,
            _detailsIPFSCID,
            _remarks,
            _status
        );
        complaints.push(newComplaint);
        // grantRole(USER,_userAddress);
    }

    function getComplaintByID(string memory _complaintID) public view returns (Complaint memory) {
        for (uint256 i = 0; i < complaints.length; i++) {
            if (keccak256(bytes(complaints[i].complaintID)) == keccak256(bytes(_complaintID))) {
                return complaints[i];
            }
        }
    }

function registerReport(Report memory newReport) public {
        reports.push(newReport);
    }

function getReport(string memory id, bool isReportID) public view returns (Report memory) {
    bytes32 idHash = keccak256(bytes(id));
    
    for (uint256 i = 0; i < reports.length; i++) {
        if (isReportID) {
            if (keccak256(bytes(reports[i].reportID)) == idHash) {
                return reports[i];
            }
        } else {
            if (keccak256(bytes(reports[i].complaintID)) == idHash) {
                return reports[i];
            }
        }
    }
    revert("Report not found");
}
function registerChargeSheet(ChargeSheet memory data) public {
        chargeSheets.push(data);
    }
    
    function getChargeSheet(string memory id) public view returns (ChargeSheet memory) {
        for (uint256 i = 0; i < chargeSheets.length; i++) {
            if (compareStrings(chargeSheets[i].chargeSheetID, id) ||
                compareStrings(chargeSheets[i].complaintID, id) ||
                compareStrings(chargeSheets[i].reportID, id)) {
                return chargeSheets[i];
            }
        }
        revert("Charge sheet not found");
    }
    
    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(bytes(a)) == keccak256(bytes(b)));
    }
}
