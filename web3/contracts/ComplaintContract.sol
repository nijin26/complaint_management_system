// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;
import "hardhat/console.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract ComplaintContract is PermissionsEnumerable {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant USER = keccak256("USER");
    bytes32 public constant STATION = keccak256("STATION");
    bytes32 public constant SUPERIOR = keccak256("SUPERIOR");

    constructor(){
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(SUPERIOR, msg.sender);
        _setRoleAdmin(SUPERIOR,SUPERIOR);
        _setRoleAdmin(STATION,SUPERIOR);
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


    modifier onlyStationOrSuperior() {
     require(hasRole(STATION, msg.sender) || hasRole(SUPERIOR, msg.sender), "You are not authorized");
     _; // Continue with the function execution
    }

    Complaint[] public complaints;
    Report[] public reports;
    ChargeSheet[] public chargeSheets;

    mapping(string => address) public complainantToComplaint;
    mapping(string => address) public stationToComplaint;
    mapping(address => address) public superiorToStation;
    mapping(address => address) public superiorToSuperior;
    mapping(string => string) public reportIDToComplaintID;
    mapping(string => string) public chargeSheetIDToReportID;

    
event AddComplaint(address indexed sender, uint256 timestamp, string complaintID);
event UpdateComplaint(address indexed sender, uint256 timestamp, string complaintID, string status);
event RegisterReport(address indexed sender, uint256 timestamp, string reportID, string complaintID);
event RegisterChargesheet(address indexed sender, uint256 timestamp, string chargeSheetID, string reportID);

function approveStation(address _stationWalletAddress) public onlyRole(SUPERIOR) {
  superiorToStation[_stationWalletAddress] = msg.sender;
  grantRole(STATION,_stationWalletAddress);
}


function approveSuperior(address _newSuperiorWalletAddress) public onlyRole(SUPERIOR) {
  superiorToSuperior[_newSuperiorWalletAddress] = msg.sender;
  grantRole(SUPERIOR,_newSuperiorWalletAddress); 
}

    function addComplaint(Complaint memory newComplaint) public {
        complaints.push(newComplaint);
        complainantToComplaint[newComplaint.complaintID] = newComplaint.complainantWalletAddress;
        stationToComplaint[newComplaint.stationID] = newComplaint.stationWalletAddress;
        _setupRole(USER,newComplaint.complainantWalletAddress);

        emit AddComplaint(msg.sender, block.timestamp, newComplaint.complaintID);
    }
    
 function updateComplaint(string memory id, string memory status, string memory remarks) public {
        for (uint256 i = 0; i < complaints.length; i++) {
            if (compareStrings(complaints[i].complaintID, id)) {
                complaints[i].status = status;
                complaints[i].remarks = remarks;
                break;
            }
        }

    emit UpdateComplaint(msg.sender, block.timestamp, id, status);
    }

    function getComplaintByID(
        string memory _complaintID
    ) public view returns (Complaint memory) {
        for (uint256 i = 0; i < complaints.length; i++) {
            if (compareStrings(complaints[i].complaintID,_complaintID)) {
                return complaints[i];
            }
        }
        revert("Complaint not found");
    }

    function filterComplaints(string memory id, address walletAddress) public view returns (Complaint[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < complaints.length; i++) {
            Complaint memory complaint = complaints[i];
            if ((compareStrings(complaint.complaintID, id) && complaint.complainantWalletAddress == walletAddress) ||
                (compareStrings(complaint.complaintID, id) && compareStrings(complaint.stationID, id) && complaint.stationWalletAddress == walletAddress)) {
                count++;
            }
        }

        Complaint[] memory filteredComplaints = new Complaint[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < complaints.length; i++) {
            Complaint memory complaint = complaints[i];
            if ((compareStrings(complaint.complaintID, id) && complaint.complainantWalletAddress == walletAddress) ||
                (compareStrings(complaint.complaintID, id) && compareStrings(complaint.stationID, id) && complaint.stationWalletAddress == walletAddress)) {
                filteredComplaints[index] = complaint;
                index++;
            }
        }

        return filteredComplaints;
    }

    function registerReport(Report memory _newReport) public onlyStationOrSuperior{
        reports.push(_newReport);
        reportIDToComplaintID[_newReport.complaintID] = _newReport.reportID;
    emit RegisterReport(msg.sender, block.timestamp, _newReport.reportID, _newReport.complaintID);
    }

    function getReports() public onlyStationOrSuperior view returns (Report[] memory) {
      return reports;
    }

  // Get report by ReportID or ComplaintID
    function getReportById(
        string memory id,
        bool isReportID
    ) public view returns (Report memory) {
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

    function registerChargeSheet(ChargeSheet memory _newChargeSheet) public onlyStationOrSuperior {
      chargeSheets.push(_newChargeSheet);
chargeSheetIDToReportID[_newChargeSheet.reportID] = _newChargeSheet.chargeSheetID;
    emit RegisterChargesheet(msg.sender, block.timestamp, _newChargeSheet.chargeSheetID, _newChargeSheet.reportID);
    }

    function getChargeSheets() public onlyStationOrSuperior view returns (ChargeSheet[] memory){
      return chargeSheets;
    }

    // Get chargesheet by ChargesheetID or ComplaintID or ReportID
    function getChargeSheetById(
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
