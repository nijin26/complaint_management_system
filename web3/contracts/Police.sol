// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Complaint.sol";

contract Police is Complaint {
    struct Station {
        string name;
        string location;
        string district;
        string stationType;
        string addr;
        uint mobile;
        bool approved;
        address approvedBy;
    }

    mapping(address => Station) public policeStations;

    event ProfileCreated(address indexed policeStation);
    event ProfileUpdated(address indexed policeStation);
    event ApprovalUpdated(address indexed policeStation, bool approved);

    modifier onlyApprovedPoliceStation() {
        require(
            policeStations[msg.sender].approved || isPoliceStation[msg.sender],
            "Unauthorized"
        );
        _;
    }

    function createProfile(
        string memory _name,
        string memory _location,
        string memory _district,
        string memory _stationType,
        string memory _addr,
        uint _mobile
    ) public {
        policeStations[msg.sender] = Station({
            name: _name,
            location: _location,
            district: _district,
            stationType: _stationType,
            addr: _addr,
            mobile: _mobile,
            approved: false,
            approvedBy: address(0)
        });
        emit ProfileCreated(msg.sender);
    }

    function updateProfile(
        string memory _name,
        string memory _location,
        string memory _district,
        string memory _stationType,
        string memory _addr,
        uint _mobile
    ) public onlyApprovedPoliceStation {
        Station storage profile = policeStations[msg.sender];
        profile.name = _name;
        profile.location = _location;
        profile.district = _district;
        profile.stationType = _stationType;
        profile.addr = _addr;
        profile.mobile = _mobile;
        emit ProfileUpdated(msg.sender);
    }

    function approvePoliceStation(
        address _policeStation,
        bool _approved
    ) public onlyPoliceSuperior {
        isPoliceStation[_policeStation] = true;
        policeStations[_policeStation].approved = _approved;
        policeStations[_policeStation].approvedBy = msg.sender;
        emit ApprovalUpdated(_policeStation, _approved);
    }

    function getProfileDetails(
        address _policeStation
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            string memory,
            bool,
            address
        )
    {
        Station memory profile = policeStations[_policeStation];
        return (
            profile.name,
            profile.location,
            profile.district,
            profile.stationType,
            profile.mobile,
            profile.addr,
            profile.approved,
            profile.approvedBy
        );
    }

  
}
