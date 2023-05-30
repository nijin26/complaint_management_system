import React, { useState } from "react";
import { useRouter } from "next/router";

import Button from "../../../Components/Button";

const ProfileForm = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = useState({
    basicDetails: {
      name: "John Doe",
      email: "johndoe@example.com",
      mobile: 1234567890,
      age: 25,
      gender: "Male",
      dob: "1998-05-10",
      addr: "123 Main Street",
      city: "New York",
      district: "ABC District",
      state: "New York",
      pincode: 12345,
    },
    idDetails: {
      selectedID: "Driving License",
      IDNumber: "DL-123456789",
    },
    relativeDetails: {
      relativeName: "Jane Doe",
      relativeMobile: 9876543210,
      relation: "Other",
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    // Perform submit logic here
    console.log("Profile submitted:", profileInfo);
  };

  const viewHandler = (e) => {
    e.preventDefault();
    router.push("/Complainant");
    // Perform view profile logic here
  };

  const handleInputChange = (e, section, field) => {
    setProfileInfo((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: e.target.value,
      },
    }));
  };

  return (
    <main className="w-3/4 md:w-1/2 mx-auto p-4 border border-black rounded-md my-10">
      <h1 className="text-center my-4 text-lg font-bold">PROFILE DETAILS</h1>
      <form className="profile flex flex-col gap-4">
        <input
          type="text"
          required
          className="input-default"
          placeholder="Enter your full name*"
          value={profileInfo.basicDetails.name}
          onChange={(e) => handleInputChange(e, "basicDetails", "name")}
        />
        <input
          type="email"
          required
          className="input-default"
          placeholder="Enter valid Email ID*"
          value={profileInfo.basicDetails.email}
          onChange={(e) => handleInputChange(e, "basicDetails", "email")}
        />
        <input
          type="number"
          required
          className="input-default"
          placeholder="Mobile Number*"
          value={profileInfo.basicDetails.mobile}
          onChange={(e) => handleInputChange(e, "basicDetails", "mobile")}
        />
        <input
          type="number"
          required
          className="input-default"
          placeholder="Age*"
          value={profileInfo.basicDetails.age}
          onChange={(e) => handleInputChange(e, "basicDetails", "age")}
        />
        <select
          required
          className="input-default"
          value={profileInfo.basicDetails.gender}
          onChange={(e) => handleInputChange(e, "basicDetails", "gender")}
        >
          <option disabled value="">
            Gender*
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Transgender">Transgender</option>
          <option value="Other">Other</option>
        </select>
        <input
          required
          placeholder="Date of Birth* (DD/MM/YY)"
          className="dob"
          type="date"
          id="date"
          value={profileInfo.basicDetails.dob}
          onChange={(e) => handleInputChange(e, "basicDetails", "dob")}
        />
        <input
          type="text"
          required
          className="input-default"
          placeholder="Address*"
          value={profileInfo.basicDetails.addr}
          onChange={(e) => handleInputChange(e, "basicDetails", "addr")}
        />
        <input
          type="text"
          required
          className="input-default"
          placeholder="City*"
          value={profileInfo.basicDetails.city}
          onChange={(e) => handleInputChange(e, "basicDetails", "city")}
        />
        <input
          type="text"
          required
          className="input-default"
          placeholder="District*"
          value={profileInfo.basicDetails.district}
          onChange={(e) => handleInputChange(e, "basicDetails", "district")}
        />
        <input
          type="text"
          required
          className="input-default"
          placeholder="State*"
          value={profileInfo.basicDetails.state}
          onChange={(e) => handleInputChange(e, "basicDetails", "state")}
        />
        <input
          type="number"
          required
          className="input-default"
          placeholder="Pincode*"
          value={profileInfo.basicDetails.pincode}
          onChange={(e) => handleInputChange(e, "basicDetails", "pincode")}
        />
        <input
          type="text"
          required
          className="input-default"
          placeholder="Relative Name*"
          value={profileInfo.relativeDetails.relativeName}
          onChange={(e) =>
            handleInputChange(e, "relativeDetails", "relativeName")
          }
        />
        <input
          type="number"
          required
          className="input-default"
          placeholder="Relative Mobile Number*"
          value={profileInfo.relativeDetails.relativeMobile}
          onChange={(e) =>
            handleInputChange(e, "relativeDetails", "relativeMobile")
          }
        />
        <select
          required
          className="input-default"
          value={profileInfo.relativeDetails.relation}
          onChange={(e) => handleInputChange(e, "relativeDetails", "relation")}
        >
          <option disabled value="">
            Relation*
          </option>
          <option value="Father">Father</option>
          <option value="Mother">Mother</option>
          <option value="Brother">Brother</option>
          <option value="Sister">Sister</option>
          <option value="Husband">Husband</option>
          <option value="Wife">Wife</option>
          <option value="Son">Son</option>
          <option value="Daughter">Daughter</option>
          <option value="Other">Other</option>
        </select>
        <select
          required
          className="input-default"
          value={profileInfo.idDetails.selectedID}
          onChange={(e) => handleInputChange(e, "idDetails", "selectedID")}
        >
          <option disabled value="">
            ID Type*
          </option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
          <option value="Driving License">Driving License</option>
          <option value="Passport">Passport</option>
          <option value="Voter ID">Voter ID</option>
        </select>
        <input
          type="text"
          required
          className="input-default"
          placeholder="ID Card Number*"
          value={profileInfo.idDetails.IDNumber}
          onChange={(e) => handleInputChange(e, "idDetails", "IDNumber")}
        />
        <Button onClick={submitHandler}>Save Profile</Button>
        <Button outlined onClick={viewHandler}>
          View Profile
        </Button>
      </form>
    </main>
  );
};

export default ProfileForm;
