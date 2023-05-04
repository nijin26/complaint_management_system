// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "hardhat/console.sol";
import "./Complaint.sol";

contract PoliceSuperior is Complaint {
    struct Superior {
        string name;
        string email;
        uint mobile;
        uint aadharID;
        string rank;
        string designation;
        string unit;
        bool approved;
        address approvedBy;
    }

    mapping(address => Superior) public policeSuperiors;

    event ProfileCreated(address indexed policeSuperior);
    event ProfileUpdated(address indexed policeSuperior);
    event ApprovalUpdated(address indexed policeSuperior, bool approved);

    modifier onlyOwnerOrPoliceSuperior() {
        require(
            msg.sender == owner || policeSuperiors[msg.sender].approved,
            "Unauthorized"
        );
        _;
    }

    modifier onlyOwnerOrApprovedPoliceSuperior() {
        require(
            msg.sender == owner ||
                (policeSuperiors[msg.sender].approved &&
                    isPoliceSuperior[msg.sender]),
            "Unauthorized"
        );
        _;
    }

    function createProfile(
        string memory _name,
        string memory _email,
        uint _mobile,
        uint _aadharID,
        string memory _rank,
        string memory _designation,
        string memory _unit
    ) public {
        policeSuperiors[msg.sender] = Superior({
            name: _name,
            email: _email,
            mobile: _mobile,
            aadharID: _aadharID,
            rank: _rank,
            designation: _designation,
            unit: _unit,
            approved: false,
            approvedBy: address(0)
        });
        emit ProfileCreated(msg.sender);
    }

    function addApprovedProfile(
        string memory _name,
        string memory _email,
        uint _mobile,
        uint _aadharID,
        string memory _rank,
        string memory _designation,
        string memory _unit,
        address _newSuperior
    ) public onlyOwnerOrPoliceSuperior {
        policeSuperiors[_newSuperior] = Superior({
            name: _name,
            email: _email,
            mobile: _mobile,
            aadharID: _aadharID,
            rank: _rank,
            designation: _designation,
            unit: _unit,
            approved: true,
            approvedBy: msg.sender
        });
        isPoliceSuperior[_newSuperior] = true;
        emit ProfileCreated(_newSuperior);
    }

    function updateProfile(
        string memory _name,
        string memory _email,
        uint _mobile,
        uint _aadharID,
        string memory _rank,
        string memory _designation,
        string memory _unit
    ) public onlyOwnerOrPoliceSuperior {
        Superior storage profile = policeSuperiors[msg.sender];
        profile.name = _name;
        profile.email = _email;
        profile.mobile = _mobile;
        profile.aadharID = _aadharID;
        profile.rank = _rank;
        profile.designation = _designation;
        profile.unit = _unit;
        emit ProfileUpdated(msg.sender);
    }

    function approvePoliceSuperior(
        address _policeSuperior,
        bool _approved
    ) public onlyOwnerOrApprovedPoliceSuperior {
        isPoliceSuperior[_policeSuperior] = true;
        policeSuperiors[_policeSuperior].approved = _approved;
        policeSuperiors[_policeSuperior].approvedBy = msg.sender;
        emit ApprovalUpdated(_policeSuperior, _approved);
    }

    function getProfileDetails()
        public
        view
        onlyOwnerOrApprovedPoliceSuperior
        returns (
            string memory,
            string memory,
            uint,
            uint,
            string memory,
            string memory,
            string memory,
            bool,
            address
        )
    {
        Superior storage profile = policeSuperiors[msg.sender];
        return (
            profile.name,
            profile.email,
            profile.mobile,
            profile.aadharID,
            profile.rank,
            profile.designation,
            profile.unit,
            profile.approved,
            profile.approvedBy
        );
    }

    function getApprovingSuperiorDetails(
        address _approvedBy
    ) public view returns (string memory name, string memory designation) {
        require(_approvedBy != address(0), "Invalid address");
        require(
            policeSuperiors[_approvedBy].approved,
            "Not an approved superior"
        );

        return (
            policeSuperiors[_approvedBy].name,
            policeSuperiors[_approvedBy].designation
        );
    }
}
