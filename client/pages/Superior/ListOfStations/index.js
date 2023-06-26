import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { stationSectors } from "public/utils";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";

const ListOfStations = () => {
  const [stations, setStations] = useState([]);
  const [selectedSector, setSelectedSector] = useState("Pathanamthitta");
  const [selectedStation, setSelectedStation] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const q = query(
          collection(db, "stations"),
          where("stationSector", "==", selectedSector)
        );
        const stationsList = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          stationsList.push(data);
        });
        setStations(stationsList);
        if (stationsList.length === 0)
          toast.info("No stations are registered under this sector.");
      } catch (err) {
        toast.error("Error in fetching stations");
        console.log(err);
      }
    };
    fetchStations();
  }, [selectedSector]);

  const handleView = (station) => {
    setIsOpen(true);
    setSelectedStation(station);
  };

  const handleApprove = async () => {
    try {
      await updateDoc(
        doc(db, "stations", selectedStation.stationWalletAddress),
        {
          approved: true,
        }
      );
      toast.success("Approved");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <label className="my-6">
          <span className="font-bold">Filter By Sector: </span>

          <select
            className="h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            {stationSectors.map((sector) => (
              <option key={sector}>{sector}</option>
            ))}
          </select>
        </label>
        <table className="w-3/4 bg-white rounded-lg shadow-lg mt-5">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Serial Number</th>
              <th className="py-2 px-4 border-b">Station Sector</th>
              <th className="py-2 px-4 border-b">Police Station</th>
              <th className="py-2 px-4 border-b">View</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station, index) => (
              <tr key={station.stationID}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{station.stationSector}</td>
                <td className="py-2 px-4 border-b">
                  {station.policeStation.stationName}
                </td>
                <td className="py-2 px-4 border-b">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleView(station)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        <div className="[&>*]:my-3">
          <p>
            <span className="font-bold">Station ID:</span>{" "}
            {selectedStation.stationID}
          </p>
          <p>
            <span className="font-bold">Landmark:</span>{" "}
            {selectedStation.landmark}
          </p>
          <p>
            <span className="font-bold">Station Sector:</span>{" "}
            {selectedStation.stationSector}
          </p>
          <p>
            <span className="font-bold">Police Station:</span>{" "}
            {selectedStation.policeStation?.stationName}
          </p>
          <p>
            <span className="font-bold">Mobile:</span> {selectedStation.mobile}
          </p>
          <p>
            <span className="font-bold">Name of CI:</span>{" "}
            {selectedStation.nameOfCI}
          </p>
          <p>
            <span className="font-bold">Name of SI:</span>{" "}
            {selectedStation.nameOfSI}
          </p>
          <p>
            <span className="font-bold">Station Wallet Address:</span>{" "}
            {selectedStation.stationWalletAddress}
          </p>
          <p>
            <span className="font-bold">Approved:</span>{" "}
            {selectedStation.approved ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-bold">Approved By:</span>{" "}
            {selectedStation.approvedBy}
          </p>
          <Button onClick={handleApprove}>Approve</Button>
        </div>
      </Modal>
    </>
  );
};

export default ListOfStations;
