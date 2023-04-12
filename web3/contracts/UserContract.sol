// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract UserContract {
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
        emit UserCreated(msg.sender, profileInfo.basicDetails.name);
    }

    // Function to get the details of a user
    function getUserDetails(address userAddress) public view returns (ProfileInfo memory) {
        return userProfiles[userAddress];
    }

    // Function to update the details of a user
    function updateUserDetails(ProfileInfo memory profileInfo) public {
        userProfiles[msg.sender] = profileInfo;
    }

    // Function to add a complaint to a user
    function addComplaint(address userAddress, uint complaintId) public {
        // TODO: Implement adding complaint to user
    }
}



// import console from hardhat console
// import "hardhat/console.sol";

// contract UserProfile {
//     struct BasicDetails {
//         string name;
//         string email;
//         uint mobile;
//         uint age;
//         string gender;
//         string dob;
//         string addr;
//         string city;
//         string district;
//         string state;
//         uint pincode;
//     }

//     struct IDDetails {
//         string selectedID;
//         string IDNumber;
//     }

//     struct RelativeDetails {
//         string relativeName;
//         uint relativeMobile;
//         string relation;
//     }

//     struct ProfileInfo {
//         BasicDetails basicDetails;
//         IDDetails idDetails;
//         RelativeDetails relativeDetails;
//     }

//     mapping(address => ProfileInfo) public userProfiles;

//     function setProfile(ProfileInfo memory profileInfo) public {
//         address userAddress = msg.sender;
//         userProfiles[userAddress] = profileInfo;
//     }

// function getUserProfile() public view returns (ProfileInfo memory) {
//     ProfileInfo memory profileInfo = userProfiles[msg.sender];
//     require(bytes(profileInfo.profile.name).length > 0, "User details not found");
//     return profileInfo;
// }
// }
