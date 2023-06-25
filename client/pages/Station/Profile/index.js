import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";

import Button from "@/Components/Button";
import Spinner from "@/Components/Spinner";
import { toast } from "react-toastify";
import { useAddress } from "@thirdweb-dev/react";
import { db } from "@/config/firebaseConfig";

const StationCard = () => {
  const router = useRouter();
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState({
    stationID: "",
    landmark: "Near City Park",
    stationSector: "",
    policeStation: "",
    mobile: "9876543210",
    nameOfCI: "John Smith",
    nameOfSI: "Jane Doe",
    stationWalletAddress: "",
    approved: true,
    approvedBy: "",
  });

  useEffect(() => {
    console.log(address);
    const fetchStationDoc = async () => {
      if (address ? true : false) {
        setLoading(true);
        const docSnap = await getDoc(doc(db, "stations", address));
        if (docSnap.exists()) {
          localStorage.setItem("stationID", docSnap.data().stationID);
          const data = docSnap.data();
          setStation(() => ({ ...data }));
        }
        setLoading(false);
      }
    };
    fetchStationDoc();
  }, []);

  const handleEdit = () => {
    router.push({ pathname: "/Station/Edit", query: { data: "Edit" } });
  };

  const handleShowList = () => {
    if (!station.approved)
      return toast.error(
        "Your Station is not approved. Wait for the superior to get it validated."
      );

    router.push("/Complaint/ListOfComplaints");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold my-4">Station Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-white w-1/2 rounded-lg shadow-lg p-6 [&>*]:my-3">
          <p>
            <span className="font-bold">Station ID:</span> {station.stationID}
          </p>
          <p>
            <span className="font-bold">Landmark:</span> {station.landmark}
          </p>
          <p>
            <span className="font-bold">Station Sector:</span>{" "}
            {station.stationSector}
          </p>
          <p>
            <span className="font-bold">Police Station:</span>{" "}
            {station.policeStation.stationName}
          </p>
          <p>
            <span className="font-bold">Mobile:</span> {station.mobile}
          </p>
          <p>
            <span className="font-bold">Name of CI:</span> {station.nameOfCI}
          </p>
          <p>
            <span className="font-bold">Name of SI:</span> {station.nameOfSI}
          </p>
          <p>
            <span className="font-bold">Station Wallet Address:</span>{" "}
            {station.stationWalletAddress}
          </p>
          <p>
            <span className="font-bold">Approved:</span>{" "}
            {station.approved ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-bold">Approved By:</span> {station.approvedBy}
          </p>
        </div>
      )}
      <Button className="my-4" onClick={handleShowList}>
        List Of Complaints
      </Button>
      <Button outlined={true} onClick={handleEdit}>
        Edit Profile
      </Button>
    </div>
  );
};

export default StationCard;
