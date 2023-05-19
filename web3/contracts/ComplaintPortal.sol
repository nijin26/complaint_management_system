// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;
import "hardhat/console.sol";

contract ComplaintPortal {
    struct ComplaintLocation {
        string placeOfIncident;
        string landmark;
        string district;
    }

    struct ComplaintParty {
        address complainant;
        address policeStation;
        address witness;
        address accused;
    }

    struct ComplaintDetails {
        uint complaintId;
        string complaintNature;
        string complaintSubject;
        string complaintDescription;
        string dateAndTime;
        ComplaintLocation location;
        ComplaintParty party;
        string officeToFileComplaint;
        string ipc;
        string status;
        string remarks;
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

    address owner;

    ComplaintDetails[] public complaints;
    address[] public addressList;

    mapping(address => uint) public ComplaintByID;
    mapping(address => Superior) public policeSuperiors;
    mapping(address => Station) public policeStations;
    mapping(address => ProfileInfo) public userProfiles;

    mapping(address => bool) public isUser;
    mapping(address => bool) public isPoliceStation;
    mapping(address => bool) public isPoliceSuperior;
    mapping(address => bool) public isJudiciary;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyUser() {
        require(isUser[msg.sender], "Only user can call this function");
        _;
    }

    modifier onlyPoliceStation() {
        require(
            isPoliceStation[msg.sender],
            "Only police station can call this function"
        );
        _;
    }
    modifier onlyApprovedPoliceStation() {
        require(
            policeStations[msg.sender].approved || isPoliceStation[msg.sender],
            "Unauthorized"
        );
        _;
    }

    modifier onlyPoliceSuperior() {
        require(
            isPoliceSuperior[msg.sender] || msg.sender == owner,
            "Only police superior can call this function"
        );
        _;
    }

    modifier onlyOwnerOrIsSuperior() {
        require(
            isPoliceSuperior[msg.sender] || msg.sender == owner,
            "Only police superior or owner can call this function"
        );
        _;
    }

    modifier onlyOwnerOrPoliceSuperior() {
        require(
            msg.sender == owner || isPoliceSuperior[msg.sender],
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

    modifier onlyJudiciary() {
        require(
            isJudiciary[msg.sender],
            "Only judiciary can call this function"
        );
        _;
    }

    function addComplaint(ComplaintDetails memory complaint) public {
        complaint.complaintId = complaints.length; // complaintId is auto-incremented by array index
        complaints.push(complaint);
    }

    function getComplaintDetails(
        uint complaintId
    ) public view returns (ComplaintDetails memory) {
        require(complaintId < complaints.length, "Complaint not found"); // added check for valid complaint ID
        return complaints[complaintId];
    }

    function updateComplaint(
        uint complaintId,
        ComplaintDetails memory updatedComplaint
    ) public {
        require(complaintId <= complaints.length, "Complaint not found"); // added check for valid complaint ID
        complaints[complaintId] = updatedComplaint;
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
    ) public onlyOwnerOrApprovedPoliceSuperior {
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
        // emit ProfileUpdated(msg.sender);
    }

    function approvePoliceSuperior(
        address _policeSuperior,
        bool _approved
    ) public onlyOwnerOrApprovedPoliceSuperior {
        policeSuperiors[_policeSuperior].approved = _approved;
        policeSuperiors[_policeSuperior].approvedBy = msg.sender;
        // emit ApprovalUpdated(_policeSuperior, _approved);
    }

    function getProfileDetails()
        public
        view
        onlyOwnerOrPoliceSuperior
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
    )
        public
        view
        onlyOwnerOrApprovedPoliceSuperior
        returns (string memory name, string memory designation)
    {
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
        addressList.push(msg.sender); // Add the new police station address to the addressList array
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
    ) public {
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
        // emit StationProfileUpdated(msg.sender);
    }

    function approveStationProfile(
        address _policeStation,
        bool _approved
    ) public onlyPoliceSuperior {
        policeStations[_policeStation].approved = _approved;
        policeStations[_policeStation].approvedBy = msg.sender;
        // emit StationApprovalUpdated(_policeStation, _approved);
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

    function getAllPoliceStations() public view returns (Station[] memory) {
        uint count = 0;
        for (uint i = 0; i < addressList.length; i++) {
            count++;
        }
        Station[] memory result = new Station[](count);
        uint index = 0;
        for (uint i = 0; i < addressList.length; i++) {
            result[index] = policeStations[addressList[i]];
            index++;
        }
        return result;
    }

    // Function to create a new user
    function createUser(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
    }

    function getUserDetails() public view returns (ProfileInfo memory) {
        return userProfiles[msg.sender];
    }

    function updateUserDetails(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
    }
}
