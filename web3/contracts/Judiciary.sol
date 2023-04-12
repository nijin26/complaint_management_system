// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import './Complaint.sol';

contract Judiciary is ComplaintContract {

    function updateComplaintDetails(uint256 _index, string memory _court, string memory _complaintStatus, string memory _remarks) public onlyJudiciary {
        require(_index < complaints.length, "Complaint does not exist");
        complaints[_index].status = _complaintStatus;
        complaints[_index].remarks = _remarks;
        complaints[_index].officeToFileComplaint = _court;
    }

    function getAllComplaints() public view onlyJudiciary returns (Complaint[] memory) {
        return complaints;
    }
}
