// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./Complaint.sol";

contract PoliceSuperior is ComplaintContract {
    
    struct PoliceStationRequest {
        string name;
        string location;
        string stationAddress;
        string phoneNumber;
        string nameOfCI;
        // address stationAddress;
        bool isApproved;
    }

    PoliceStationRequest[] public policeStationRequests;

    mapping(address => bool) public isSuperior;
    mapping(address => bool) public isPoliceStationApproved;

    constructor() {
        isSuperior[msg.sender] = true;
    }

    modifier onlySuperior() {
        require(isSuperior[msg.sender], "Only a police superior can perform this action");
        _;
    }

    function addPoliceStationRequest(string memory _name, string memory _location, string memory _address, string memory _phoneNumber, string memory _nameOfCI, address _stationAddress) public {
        policeStationRequests.push(PoliceStationRequest(_name, _location, _address, _phoneNumber, _nameOfCI, _stationAddress, false));
    }

    function approvePoliceStationRequest(uint256 _index) public onlySuperior {
        require(_index < policeStationRequests.length, "Request does not exist");
        policeStationRequests[_index].isApproved = true;
        isPoliceStation[policeStationRequests[_index].stationAddress] = true;
    }

    function denyPoliceStationRequest(uint256 _index) public onlySuperior {
        require(_index < policeStationRequests.length, "Request does not exist");
        delete policeStationRequests[_index];
    }

    function listPoliceStations() public view returns (address[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < complaints.length; i++) {
            if (isPoliceStationApproved[complaints[i].officeToFileComplaint] && !contains(policeStations, complaints[i].officeToFileComplaint)) {
                count++;
            }
        }
        address[] memory result = new address[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < complaints.length; i++) {
            if (isPoliceStationApproved[complaints[i].officeToFileComplaint] && !contains(policeStations, complaints[i].officeToFileComplaint)) {
                result[index] = complaints[i].officeToFileComplaint;
                index++;
            }
        }
        return result;
    }

    function contains(address[] memory arr, address val) private pure returns (bool) {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == val) {
                return true;
            }
        }
        return false;
    }

    function managePoliceStation(uint256 _index, string memory _complaintNature, string memory _casteCategory, string memory _placeOfIncident, string memory _dateAndTime, string memory _complaintDescription) public onlyPoliceStation {
        Complaint memory complaint = Complaint(_complaintNature, _casteCategory, _placeOfIncident, _dateAndTime, msg.sender, msg.sender, "", _complaintDescription, "", "");
        addComplaint(complaint);
    }

    function updateComplaintStatusBySuperior(uint256 _index, string memory _status, string memory _remarks) public onlySuperior {
        updateComplaintStatus(_index, _status, _remarks);
    }
}