// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Complaint {
    
    struct ComplaintDetails {
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
    
    ComplaintDetails[] complaints;
    address owner;
    mapping(address => bool) isUser;
    mapping(address => bool) isPoliceStation;
    mapping(address => bool) isPoliceSuperior;
    mapping(address => bool) isJudiciary;

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
        require(isPoliceStation[msg.sender], "Only police station can call this function");
        _;
    }
    
    modifier onlyPoliceSuperior() {
        require(isPoliceSuperior[msg.sender], "Only police superior can call this function");
        _;
    }
    
    modifier onlyJudiciary() {
        require(isJudiciary[msg.sender], "Only judiciary can call this function");
        _;
    }
    
    function addComplaint(ComplaintDetails memory complaint) public {
        complaints.push(complaint);
        emit ComplaintAdded(complaint);
    }
    
    function getComplaintDetails(uint index) public view returns (ComplaintDetails memory) {
        require(index < complaints.length, "Invalid index");
        return complaints[index];
    }
    
    function updateComplaint(uint index, ComplaintDetails memory updatedComplaint) public onlyPoliceStation {
        require(index < complaints.length, "Invalid index");
        complaints[index] = updatedComplaint;
        emit ComplaintUpdated(updatedComplaint);
    }
    
    event ComplaintAdded(ComplaintDetails complaint);
    event ComplaintUpdated(ComplaintDetails updatedComplaint);
    
}
