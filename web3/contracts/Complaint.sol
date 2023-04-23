// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Complaint {
    struct ComplaintDetails {
        uint complaintId;
        string complaintNature;
        string casteCategory;
        string placeOfIncident;
        string dateAndTime;
        string policeStation;
        string officeToFileComplaint;
        string district;
        string complaintDescription;
        string status;
        string remarks;
    }

    ComplaintDetails[] public complaints;
    address owner;
    mapping(address => uint) ComplaintByID;
    mapping(address => bool) isUser;
    mapping(address => bool) isPoliceStation;
    mapping(address => bool) isPoliceSuperior;
    mapping(address => bool) isJudiciary;

    constructor() {
        owner = msg.sender;
    }

    event ComplaintAdded(ComplaintDetails complaint);
    event ComplaintUpdated(ComplaintDetails updatedComplaint);

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

    modifier onlyPoliceSuperior() {
        require(
            isPoliceSuperior[msg.sender],
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
        emit ComplaintAdded(complaint);
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
        emit ComplaintUpdated(updatedComplaint);
    }
}
