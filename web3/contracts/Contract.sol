// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";
import "@thirdweb-dev/contracts/extension/PermissionsEnumerable.sol";

contract Complaint is PermissionsEnumerable {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant USER = keccak256("USER");
    bytes32 public constant STATION = keccak256("STATION");
    bytes32 public constant SUPERIOR = keccak256("SUPERIOR");
    bytes32 public constant JUDICIARY = keccak256("JUDICIARY");

    constructor() {
        _setupRole(OWNER, msg.sender);
        _setupRole(SUPERIOR, msg.sender);
        _setRoleAdmin(OWNER, OWNER);
        _setRoleAdmin(USER, OWNER);
        _setRoleAdmin(STATION, OWNER);
        _setRoleAdmin(SUPERIOR, OWNER);
        _setRoleAdmin(JUDICIARY, OWNER);
    }

    struct UserComplaintDetails {
        string complaintNature;
        string complaintSubject;
        string complaintDescription;
        string dateAndTime;
        string placeOfIncident;
        string landmark;
        string district;
        address policeStation;
        string officeToFileComplaint;
    }

    struct ComplaintDetailsByPolice {
        address witness;
        address accused;
        string ipc;
        string status;
        string remarks;
    }

    struct ComplaintEntry {
        uint complaintID;
        UserComplaintDetails userComplaint;
        ComplaintDetailsByPolice policeComplaint;
    }

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

    struct BasicDetails {
        string name;
        string email;
        uint mobile;
        uint age;
        string gender;
        string dob;
        string addr;
        string city;
        string district;
        string state;
        uint pincode;
    }

    struct IDDetails {
        string selectedID;
        string IDNumber;
    }

    struct RelativeDetails {
        string relativeName;
        uint relativeMobile;
        string relation;
    }

    struct ProfileInfo {
        BasicDetails basicDetails;
        IDDetails idDetails;
        RelativeDetails relativeDetails;
    }

    ComplaintEntry[] public complaints;

    address[] public listOfUsers;
    address[] public listOfStations;
    address[] public listOfSuperiors;

    mapping(address => Superior) public policeSuperiors;
    mapping(address => Station) public policeStations;
    mapping(address => ProfileInfo) public userProfiles;

    // <<<<<<<<<<<< COMPLAINT MODULE >>>>>>>>>>>>>>>>>>

    function addComplaintByUser(
        UserComplaintDetails memory _details
    ) public onlyRole(USER) {
        ComplaintEntry memory entry;
        entry.userComplaint = _details;
        entry.complaintID = complaints.length; // complaintId is auto-incremented by array index
        complaints.push(entry);
    }

    function addComplaintByPolice(
        UserComplaintDetails memory _details,
        ComplaintDetailsByPolice memory _otherDetails
    ) public {
        // Check authorization
        require(
            hasRole(STATION, msg.sender) || hasRole(SUPERIOR, msg.sender),
            "YOU ARE NOT AUTHORIZED"
        );

        ComplaintEntry memory entry;
        entry.complaintID = complaints.length; // complaintId is auto-incremented by array index
        entry.userComplaint = _details;
        entry.policeComplaint = _otherDetails;
        complaints.push(entry);
    }

    //<<<<<<<<< GET COMPLAINT DETAILS >>>>>>>>>>>>>>>
    function getComplaintDetailsById(
        uint _complaintId
    )
        public
        view
        returns (UserComplaintDetails memory, ComplaintDetailsByPolice memory)
    {
        require(_complaintId < complaints.length, "Invalid complaint ID");

        ComplaintEntry storage complaint = complaints[_complaintId];
        return (complaint.userComplaint, complaint.policeComplaint);
    }

    // <<<<<<<<< UPDATE COMPLAINT >>>>>>>>>>>>
    function updateComplaintByUser(
        uint _complaintId,
        UserComplaintDetails memory _updatedDetails
    ) public onlyRole(USER) {
        require(_complaintId < complaints.length, "Invalid complaint ID");

        ComplaintEntry storage complaint = complaints[_complaintId];
        complaint.userComplaint = _updatedDetails;
    }

    function updateComplaintByPolice(
        uint complaintId,
        UserComplaintDetails memory updatedDetails,
        ComplaintDetailsByPolice memory updatedPoliceDetails
    ) public {
        require(complaintId < complaints.length, "Invalid complaint ID");
        require(
            hasRole(STATION, msg.sender) || hasRole(SUPERIOR, msg.sender),
            "YOU ARE NOT AUTHORIZED"
        );

        ComplaintEntry storage complaint = complaints[complaintId];
        complaint.userComplaint = updatedDetails;
        complaint.policeComplaint = updatedPoliceDetails;
    }

    // <<<<<<<<<<<<< USER MODULE >>>>>>>>>>>>

    function createUser(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
        grantRole(USER, msg.sender);
    }

    function getUserDetails() public view returns (ProfileInfo memory) {
        return userProfiles[msg.sender];
    }

    function updateUserDetails(
        ProfileInfo memory profileInfo
    ) public onlyRole(USER) {
        userProfiles[msg.sender] = profileInfo;
    }

    // <<<<<<<<< SUPERIOR MODULE >>>>>>>>>>>>>>>

    function createSuperiorProfile(Superior memory profileInfo) public {
        policeSuperiors[msg.sender] = profileInfo;
        if (hasRole(SUPERIOR, msg.sender)) {
            console.log("Has role for superior is executed");
            policeSuperiors[msg.sender].approved = true;
            policeSuperiors[msg.sender].approvedBy = msg.sender;
        }
    }

    function updateSuperiorProfile(Superior memory profileInfo) public {
        policeSuperiors[msg.sender] = profileInfo;
    }

    function approvePoliceSuperior(address _policeSuperior) public {
        require(
            hasRole(OWNER, msg.sender) || hasRole(SUPERIOR, msg.sender),
            "YOU ARE NOT AUTHORIZED"
        );
        grantRole(SUPERIOR, _policeSuperior);
        policeSuperiors[_policeSuperior].approved = true;
        policeSuperiors[_policeSuperior].approvedBy = msg.sender;
    }

    function addApprovedSuperiorProfile(
        address _newSuperior,
        Superior memory profileInfo
    ) public onlyRole(OWNER) {
        policeSuperiors[_newSuperior] = profileInfo;
        grantRole(SUPERIOR, _newSuperior);
    }

    function getSuperiorProfileDetails()
        public
        view
        onlyRole(SUPERIOR)
        returns (Superior memory)
    {
        return policeSuperiors[msg.sender];
    }

    function getApprovingSuperiorDetails(
        address _approvedBy
    ) public view returns (string memory name, string memory designation) {
        require(_approvedBy != address(0), "Invalid address");
        require(hasRole(SUPERIOR, _approvedBy), "Not an approved superior");

        return (
            policeSuperiors[_approvedBy].name,
            policeSuperiors[_approvedBy].designation
        );
    }

    function createStationProfile(Station memory _stationDetails) public {
        policeStations[msg.sender] = _stationDetails;
    }

    function updateStationProfile(
        Station memory _updatedStationDetails
    ) public onlyRole(STATION) {
        policeStations[msg.sender] = _updatedStationDetails;
    }

    function approveStationProfile(
        address _policeStation
    ) public onlyRole(SUPERIOR) {
        grantRole(STATION, _policeStation);
        policeStations[_policeStation].approved = true;
        policeStations[_policeStation].approvedBy = msg.sender;
    }

    function getStationDetails() public view returns (Station memory) {
        return policeStations[msg.sender];
    }

    function getUserType() public view returns (string memory) {
        if (hasRole(SUPERIOR, msg.sender)) {
            return "SUPERIOR";
        } else if (hasRole(STATION, msg.sender)) {
            return "STATION";
        } else if (hasRole(USER, msg.sender)) {
            return "USER";
        } else {
            return "";
        }
    }

    // function getAllUsers()
    //     public
    //     view
    //     onlyRole(SUPERIOR)
    //     returns (ProfileInfo[] memory)
    // {
    //     uint userCount = listOfUsers.length;
    //     ProfileInfo[] memory result = new ProfileInfo[](userCount);

    //     uint index = 0;
    //     for (uint i = 0; i < userCount; i++) {
    //         result[index] = userProfiles[listOfUsers[i]];
    //         index++;
    //     }
    //     return result;
    // }

    // function getAllSuperiors()
    //     public
    //     view
    //     onlyRole(SUPERIOR)
    //     returns (Superior[] memory)
    // {
    //     uint superiorCount = listOfSuperiors.length;
    //     Superior[] memory result = new Superior[](superiorCount);

    //     uint index = 0;
    //     for (uint i = 0; i < superiorCount; i++) {
    //         result[index] = policeSuperiors[listOfSuperiors[i]];
    //         index++;
    //     }
    //     return result;
    // }

    // function getAllPoliceStations()
    //     public
    //     view
    //     onlyRole(SUPERIOR)
    //     returns (Station[] memory)
    // {
    //     uint stationCount = listOfStations.length;
    //     Station[] memory result = new Station[](stationCount);

    //     uint index = 0;
    //     for (uint i = 0; i < stationCount; i++) {
    //         result[index] = policeStations[listOfStations[i]];
    //         index++;
    //     }
    //     return result;
    // }
}
