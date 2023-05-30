import { useRouter } from "next/router";
import Button from "../../Components/Button";

const ProfileDetails = () => {
  const router = useRouter();
  const profileInfo = {
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
  };
  return (
    <div className="flex justify-center">
      <div className="my-10 bg-white border border-gray-300 rounded-lg p-4 w-96 min-h-[60vh] ">
        <h2 className="text-lg font-bold text-center mb-4">Profile Details</h2>
        <div className="space-y-4">
          <h3 className="font-bold text-stone-500">Basic Details</h3>
          <p>
            <strong>Name:</strong> {profileInfo.basicDetails.name}
          </p>
          <p>
            <strong>Email:</strong> {profileInfo.basicDetails.email}
          </p>
          <p>
            <strong>Mobile:</strong> {profileInfo.basicDetails.mobile}
          </p>
          <p>
            <strong>Age:</strong> {profileInfo.basicDetails.age}
          </p>
          <p>
            <strong>Gender:</strong> {profileInfo.basicDetails.gender}
          </p>
          <p>
            <strong>Date of Birth:</strong> {profileInfo.basicDetails.dob}
          </p>
          <p>
            <strong>Address:</strong> {profileInfo.basicDetails.addr}
          </p>
          <p>
            <strong>City:</strong> {profileInfo.basicDetails.city}
          </p>
          <p>
            <strong>District:</strong> {profileInfo.basicDetails.district}
          </p>
          <p>
            <strong>State:</strong> {profileInfo.basicDetails.state}
          </p>
          <p>
            <strong>Pincode:</strong> {profileInfo.basicDetails.pincode}
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <h3 className="font-bold text-stone-500">ID Details</h3>
          <p>
            <strong>Selected ID:</strong> {profileInfo.idDetails.selectedID}
          </p>
          <p>
            <strong>ID Number:</strong> {profileInfo.idDetails.IDNumber}
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <h3 className="font-bold text-stone-500">Relative Details</h3>
          <p>
            <strong>Relative Name:</strong>{" "}
            {profileInfo.relativeDetails.relativeName}
          </p>
          <p>
            <strong>Relative Mobile:</strong>{" "}
            {profileInfo.relativeDetails.relativeMobile}
          </p>
          <p>
            <strong>Relation:</strong> {profileInfo.relativeDetails.relation}
          </p>
        </div>
        <Button
          className="my-5 w-full"
          onClick={() => router.push("/Complainant/Edit")}
        >
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileDetails;
