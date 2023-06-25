import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Button from "../../../Components/Button";
import useDataEncryption from "@/Hooks/useDataEncryption";
import { useAddress, useStorage } from "@thirdweb-dev/react";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner";

const ProfileForm = () => {
  const router = useRouter();
  const address = useAddress();
  const storage = useStorage();
  const encryptData = useDataEncryption();

  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    console.log(address, "address of user wallet");
    const fetchUserDoc = async () => {
      if ((address ? true : false) && router.query?.data !== "Edit") {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "users", address));
        if (docSnap.exists()) {
          localStorage.setItem("userName", docSnap.data().name);
          router.push("/Complainant");
        }
        setLoading(false);
      }
    };
    fetchUserDoc();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!address) return toast.error("You must be connected to wallet");

    setLoading(true);
    const data = {
      ...profileInfo,
      profileCreatedAt: new Date().getTime().toString(),
    };
    const encryptedData = encryptData(data);
    const profileDetailsIPFS = await storage.upload(encryptedData);
    toast.info("Profile Details are encrypted are stored in IPFS");
    const dataIndex = {
      complainantWalletAddress: address,
      name: data.basicDetails.name,
      email: data.basicDetails.email,
      profileDetailsIPFSCID: profileDetailsIPFS,
    };

    try {
      await setDoc(doc(db, "users", address), dataIndex);
      toast.success("Profile saved successfully");
      localStorage.setItem("userName", dataIndex.name);
      setLoading(false);
    } catch (err) {
      console.log(err, "Profile saving error");
      toast.error("Profile saving failed. Try Again.");
      setLoading(false);
    }
  };

  const viewHandler = (e) => {
    e.preventDefault();
    router.push("/Complainant");
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
    <>
      {loading ? (
        <Spinner />
      ) : (
        <main className="xs:w-3/4 w-1/2 mx-auto p-4 border border-black rounded-md my-10">
          <h1 className="text-center my-4 text-lg font-bold">
            PROFILE DETAILS
          </h1>
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
              onChange={(e) =>
                handleInputChange(e, "relativeDetails", "relation")
              }
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
            {loading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col justify-between [&>*]:my-2">
                <Button onClick={submitHandler}>Save Profile</Button>
                <Button outlined onClick={viewHandler}>
                  View Profile
                </Button>
              </div>
            )}
          </form>
        </main>
      )}
    </>
  );
};

export default ProfileForm;
