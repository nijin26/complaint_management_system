// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./Complaint.sol";

contract User is Complaint {
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

    mapping(address => ProfileInfo) public userProfiles;

    // Event to emit when a new user is created
    event UserCreated(address indexed userAddress, string name);
    event UserUpdated(address indexed userAddress, string name);

    // Function to create a new user
    function createUser(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
        isUser[msg.sender] = true;
        emit UserCreated(msg.sender, profileInfo.basicDetails.name);
    }

    // Function to get the details of a user
    function getUserDetails(
        address userAddress
    ) public view returns (ProfileInfo memory) {
        return userProfiles[userAddress];
    }

    // Function to update the details of a user
    function updateUserDetails(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
    }
}
