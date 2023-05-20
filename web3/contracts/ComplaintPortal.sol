// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.18;
import "hardhat/console.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ComplaintPortal is AccessControl {
    bytes32 public constant OWNER = keccak256("OWNER");
    bytes32 public constant USER = keccak256("USER");
    bytes32 public constant STATION = keccak256("STATION");
    bytes32 public constant SUPERIOR = keccak256("SUPERIOR");
    bytes32 public constant JUDICIARY = keccak256("JUDICIARY");

    constructor() {
        _grantRole(OWNER, msg.sender);
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

    ComplaintEntry[] public complaints;

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

    address[] public addressList;

    mapping(address => uint) public ComplaintByID;
    mapping(address => Superior) public policeSuperiors;
    mapping(address => Station) public policeStations;
    mapping(address => ProfileInfo) public userProfiles;

   function addComplaint(
        uint _complaintId,
        string memory _complaintNature,
        string memory _complaintSubject,
        string memory _complaintDescription,
        string memory _dateAndTime,
        string memory _placeOfIncident,
        string memory _landmark,
        string memory _district,
        address _policeStation,
        string memory _officeToFileComplaint,
        address _witness,
        address _accused,
        string memory _ipc,
        string memory _status,
        string memory _remarks
    ) public {
        ComplaintEntry memory entry;
        entry.userComplaint = UserComplaintDetails(
            _complaintNature,
            _complaintSubject,
            _complaintDescription,
            _dateAndTime,
            _placeOfIncident,
            _landmark,
            _district,
            _policeStation,
            _officeToFileComplaint
        );
        entry.policeComplaint = ComplaintDetailsByPolice(
            _witness,
            _accused,
            _ipc,
            _status,
            _remarks
        );
        entry.complaintID = complaints.length; // complaintId is auto-incremented by array index
        complaints.push(entry);
    }
}

    // function addComplaint(ComplaintDetails memory complaint) public {
    //     complaint.complaintId = complaints.length; // complaintId is auto-incremented by array index
    //     complaints.push(complaint);

 function getComplaintDetailsByAddress(address _address) public view returns (UserComplaintDetails memory, ComplaintDetailsByPolice memory) {
    for (uint i = 0; i < complaints.length; i++) {
        if (complaints[i].userComplaint.policeStation == _address) {
            return (complaints[i].userComplaint, complaints[i].policeComplaint);
        }
    }
    // If no matching complaint is found, return empty structs or handle the case as per your requirement
    revert("No complaint found for the given address");
}


function updateComplaint(uint complaintId, UserComplaintDetails memory updatedDetails, ComplaintDetailsByPolice memory updatedPoliceDetails) public {
    require(complaintId < complaints.length, "Invalid complaint ID");

    Complaint storage complaint = complaints[complaintId];

    // Update user complaint details
    complaint.userComplaint.complaintNature = updatedDetails.complaintNature;
    complaint.userComplaint.complaintSubject = updatedDetails.complaintSubject;
    complaint.userComplaint.complaintDescription = updatedDetails.complaintDescription;
    complaint.userComplaint.dateAndTime = updatedDetails.dateAndTime;
    complaint.userComplaint.placeOfIncident = updatedDetails.placeOfIncident;
    complaint.userComplaint.landmark = updatedDetails.landmark;
    complaint.userComplaint.district = updatedDetails.district;
    complaint.userComplaint.policeStation = updatedDetails.policeStation;
    complaint.userComplaint.officeToFileComplaint = updatedDetails.officeToFileComplaint;

    // Update police complaint details
    complaint.policeComplaint.witness = updatedPoliceDetails.witness;
    complaint.policeComplaint.accused = updatedPoliceDetails.accused;
    complaint.policeComplaint.ipc = updatedPoliceDetails.ipc;
    complaint.policeComplaint.status = updatedPoliceDetails.status;
    complaint.policeComplaint.remarks = updatedPoliceDetails.remarks;
}


    function createSuperiorProfile(
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

    function addApprovedSuperiorProfile(
        string memory _name,
        string memory _email,
        uint _mobile,
        uint _aadharID,
        string memory _rank,
        string memory _designation,
        string memory _unit,
        address _newSuperior
    ) public {
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

    function updateSuperiorProfile(
        string memory _name,
        string memory _email,
        uint _mobile,
        uint _aadharID,
        string memory _rank,
        string memory _designation,
        string memory _unit
    ) public {
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
    ) public {
        policeSuperiors[_policeSuperior].approved = _approved;
        policeSuperiors[_policeSuperior].approvedBy = msg.sender;
        // emit ApprovalUpdated(_policeSuperior, _approved);
    }

    function getSuperiorProfileDetails()
        public
        view
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
    ) public onlyRole(SUPERIOR) {
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
