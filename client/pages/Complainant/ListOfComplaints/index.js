import React, { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../config/firebaseConfig";
import { Firestore } from "firebase/firestore";

const ListOfComplaints = () => {
  const address = useAddress();
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    console.log(address, "address");
    if (address) {
      const fetchComplaints = async () => {
        const q = query(
          collection(db, "complaints"),
          where("userAddress", "==", address)
        );

        const querySnapshot = await getDocs(q);
        const listOfComplaints = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          listOfComplaints.push(data);
          // console.log(doc.id, " => ", doc.data());
        });
        setComplaints(listOfComplaints);
        console.log(listOfComplaints, "list of complaints");
      };
      fetchComplaints();
    }
  }, []);

  return (
    <div className="container mx-auto my-10 ">
      <h1 className="text-2xl font-bold text-center my-5">
        List Of Complaints
      </h1>
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-stone text-stone-700 border-b border-gray-700 ">
            <th className="py-2 px-4"> # </th>
            <th className="py-2 px-4"> Registered at </th>
            <th className="py-2 px-4"> Status </th>
            <th className="py-2 px-4"> More Details </th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint, index) => (
            <tr key={complaint.id} className="border-b border-gray-300">
              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center">
                {new Date(complaint.complaintCreatedAt).toLocaleString()}
              </td>
              <td className="py-2 px-4 text-center">{complaint.status}</td>
              <td className="py-2 px-4 text-center">
                <button className="bg-stone-500 hover:bg-opacity-75 text-white font-bold py-2 px-4 rounded">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListOfComplaints;
