// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Complaint.sol';

contract Police is ComplaintContract {

    struct PoliceStation {
        string name;
        string location;
        string stationAddress;
        string phoneNumber;
        string nameOfCI;
    }

    mapping(address => PoliceStation) public policeStations;

    modifier onlyRegisteredPoliceStation() {
        require(isPoliceStation[msg.sender], "Only a registered police station can perform this action");
        _;
    }

    function registerPoliceStation(string memory _name, string memory _location, string memory _stationAddress, string memory _phoneNumber, string memory _nameOfCI) public {
        require(!isPoliceStation[msg.sender], "Police station already registered.");
        isPoliceStation[msg.sender] = true;
        policeStations[msg.sender] = PoliceStation(_name, _location, _stationAddress, _phoneNumber, _nameOfCI);
    }

    function addFir(uint256 _index, string memory _remarks) public onlyRegisteredPoliceStation {
        require(_index < complaints.length, "Complaint does not exist");
        complaints[_index].status = "FIR";
        complaints[_index].remarks = _remarks;
    }

    function addNcr(uint256 _index, string memory _remarks) public onlyRegisteredPoliceStation {
        require(_index < complaints.length, "Complaint does not exist");
        complaints[_index].status = "NCR";
        complaints[_index].remarks = _remarks;
    }
}
