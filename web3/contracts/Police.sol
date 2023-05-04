// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";
import "./PoliceSuperior.sol";

contract Police is PoliceSuperior {
    struct Station {
        string name;
        string addr;
        string district;
        string landmark;
        string stationType;
        uint mobile;
        string nameOfCI;
        string nameOfSI;
        bool approved;
        address approvedBy;
    }

    mapping(address => Station) public policeStations;

    event StationProfileCreated(address indexed policeStation);
    event StationProfileUpdated(address indexed policeStation);
    event StationApprovalUpdated(address indexed policeStation, bool approved);

    modifier onlyApprovedPoliceStation() {
        require(
            policeStations[msg.sender].approved || isPoliceStation[msg.sender],
            "Unauthorized"
        );
        _;
    }

    function createStationProfile(
        string memory _name,
        string memory _addr,
        string memory _district,
        string memory _landmark,
        string memory _stationType,
        uint _mobile,
        string memory _nameOfCI,
        string memory _nameOfSI
    ) public {
        policeStations[msg.sender] = Station({
            name: _name,
            addr: _addr,
            district: _district,
            landmark: _landmark,
            stationType: _stationType,
            mobile: _mobile,
            nameOfCI: _nameOfCI,
            nameOfSI: _nameOfSI,
            approved: false,
            approvedBy: address(0)
        });
        emit StationProfileCreated(msg.sender);
    }

    function updateStationProfile(
        string memory _name,
        string memory _addr,
        string memory _district,
        string memory _landmark,
        string memory _stationType,
        uint _mobile,
        string memory _nameOfCI,
        string memory _nameOfSI
    ) public onlyApprovedPoliceStation {
        Station storage profile = policeStations[msg.sender];
        profile.name = _name;
        profile.addr = _addr;
        profile.district = _district;
        profile.landmark = _landmark;
        profile.stationType = _stationType;
        profile.mobile = _mobile;
        profile.nameOfCI = _nameOfCI;
        profile.nameOfSI = _nameOfSI;
        profile.addr = _addr;
        profile.mobile = _mobile;
        emit StationProfileUpdated(msg.sender);
    }

    function approveStationProfile(
        address _policeStation,
        bool _approved
    ) public onlyPoliceSuperior {
        isPoliceStation[_policeStation] = true;
        policeStations[_policeStation].approved = _approved;
        policeStations[_policeStation].approvedBy = msg.sender;
        emit StationApprovalUpdated(_policeStation, _approved);
    }

    function getStationDetails()
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            uint,
            string memory,
            string memory,
            bool,
            address
        )
    {
        Station memory profile = policeStations[msg.sender];
        return (
            profile.name,
            profile.addr,
            profile.district,
            profile.landmark,
            profile.stationType,
            profile.mobile,
            profile.nameOfCI,
            profile.nameOfSI,
            profile.approved,
            profile.approvedBy
        );
    }
}
