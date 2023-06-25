import Button from "@/Components/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { stationSectors, getPoliceStation } from "public/utils";
import { useAddress } from "@thirdweb-dev/react";
import { getDoc, setDoc, doc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { toast } from "react-toastify";
import Spinner from "@/Components/Spinner";

const StationProfileForm = () => {
  const [station, setStation] = useState({
    stationID: "",
    landmark: "Near City Park",
    stationSector: "",
    policeStation: "",
    mobile: "9876543210",
    nameOfCI: "John Smith",
    nameOfSI: "Jane Doe",
    stationWalletAddress: "",
    approved: false,
    approvedBy: "",
  });

  const address = useAddress();
  const router = useRouter();
  const [policeStations, setPoliceStations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const listOfStations = getPoliceStation(station.stationSector || "Kollam");
    setPoliceStations(listOfStations);
  }, [station.stationSector]);

  useEffect(() => {
    const fetchStationDoc = async () => {
      if ((address ? true : false) && router.query?.data !== "Edit") {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "stations", address));
        if (docSnap.exists()) {
          localStorage.setItem("stationID", docSnap.data().stationID);
          const data = docSnap.data();
          setStation((prev) => ({ ...prev, ...data }));
          router.push("/Station/Profile");
        }
        setLoading(false);
      }
    };
    fetchStationDoc();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stationDetails = station;
    stationDetails.stationID = station.policeStation.stationID;
    stationDetails.stationWalletAddress = address;
    try {
      await setDoc(
        doc(db, "stations", stationDetails.stationWalletAddress),
        stationDetails
      );
      localStorage.setItem("stationID", stationDetails.stationID);
      toast.success("Station profile updated successfully");
      setLoading(false);
      router.push("/Station/Profile");
    } catch (error) {
      console.log(error, "Error in updating station profile");
      toast.error("Station profile updation error. Try again.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto my-5">
      <h1 className="font-bold text-xl text-center">EDIT STATION PROFILE</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mt-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="stationSector"
              className="block text-gray-700 font-bold mb-2"
            >
              Station Sector
            </label>
            <select
              required
              disabled={loading}
              id="stationSector"
              name="stationSector"
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
              value={station.stationSector}
              onChange={handleInputChange}
            >
              <option value="">-- Select Sector --</option>
              {stationSectors.map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="policeStation"
              className="block text-gray-700 font-bold my-2"
            >
              Police Station
            </label>
            <select
              required
              disabled={loading}
              id="policeStation"
              name="policeStation"
              className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
              value={station.policeStation.stationID || ""}
              onChange={(e) => {
                const selectedStationObject = policeStations.find(
                  (s) => s.stationID === e.target.value
                );
                setStation((prev) => ({
                  ...prev,
                  policeStation: selectedStationObject,
                }));
              }}
            >
              <option value="" disabled>
                Select police station
              </option>
              {policeStations.map((s) => (
                <option key={s.stationID} value={s.stationID}>
                  {s.stationName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="landmark"
            >
              Landmark
            </label>
            <input
              value={station.landmark}
              onChange={handleInputChange}
              required
              className="border rounded-lg py-2 px-3 w-full"
              id="landmark"
              name="landmark"
              type="text"
              placeholder="Enter Landmark"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="mobile-number"
            >
              Mobile Number
            </label>
            <input
              value={station.mobile}
              onChange={handleInputChange}
              required
              className="border rounded-lg py-2 px-3 w-full"
              id="mobile-number"
              name="mobile"
              type="text"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="ci-name"
            >
              Name of Current CI
            </label>
            <input
              value={station.nameOfCI}
              onChange={handleInputChange}
              required
              className="border rounded-lg py-2 px-3 w-full"
              id="ci-name"
              name="nameOfCI"
              type="text"
              placeholder="Enter Name of Current CI"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="si-name"
            >
              Name of Current SI
            </label>
            <input
              value={station.nameOfSI}
              onChange={handleInputChange}
              required
              className="border rounded-lg py-2 px-3 w-full"
              id="si-name"
              name="nameOfSI"
              type="text"
              placeholder="Enter Name of Current SI"
            />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <Button className="w-full" type="submit">
              Update Profile
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default StationProfileForm;
