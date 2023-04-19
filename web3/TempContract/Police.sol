// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Complaint.sol";
import "./PoliceSuperior.sol";

contract Police is Complaint, PoliceSuperior {
    struct Station {
        string name;
        string location;
        string district;
        string stationType;
        uint mobile;
        string addr;
        bool approved;
        address approvedBy;
    }

    mapping(address => Station) public policeStations;

    event ProfileCreated(address indexed policeStation);
    event ProfileUpdated(address indexed policeStation);
    event ApprovalUpdated(address indexed policeStation, bool approved);

    modifier onlyOwnerOrApprovedPoliceStation() {
        require(
            msg.sender == owner || policeStations[msg.sender].approved,
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
            mobile: _mobile,
            addr: _addr,
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
    ) public onlyOwnerOrApprovedPoliceStation {
        Station storage profile = policeStations[msg.sender];
        profile.name = _name;
        profile.location = _location;
        profile.district = _district;
        profile.stationType = _stationType;
        profile.mobile = _mobile;
        profile.addr = _addr;
        emit ProfileUpdated(msg.sender);
    }

    function approvePoliceStation(
        address _policeStation,
        bool _approved
    ) public onlyOwnerOrApprovedPoliceSuperior {
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
            string memory,
            uint,
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

    function getApprovingSuperiorDetails(
        address _policeStation
    ) public view returns (string memory, string memory) {
        Station memory profile = policeStations[_policeStation];
        require(
            profile.approvedBy != address(0),
            "No approving superior found"
        );
        Superior memory approvingSuperior = policeSuperiors[profile.approvedBy];
        return (approvingSuperior.name, approvingSuperior.designation);
    }
}
