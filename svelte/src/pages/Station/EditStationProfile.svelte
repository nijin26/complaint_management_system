<script>
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import { navigate } from "svelte-routing";

  import { stationTypes } from "../../lib/Lists";
  import { connectingWithComplaintPortal } from "../../lib/Contract";
  import { profileType } from "../../lib/Store";

  // let station = {
  //   name: "",
  //   addr: "",
  //   district: "",
  //   landmark: "",
  //   stationType: "",
  //   mobile: 0,
  //   nameOfCI: "",
  //   nameOfSI: "",
  //   approved: false,
  //   approvedBy: "",
  // };
  let station = {
    name: "ABC Police Station",
    addr: "123 Main Street",
    district: "XYZ District",
    landmark: "Near City Park",
    stationType: "Rural Police Station",
    mobile: 9876543210,
    nameOfCI: "John Smith",
    nameOfSI: "Jane Doe",
    approved: false,
    approvedBy: ethers.constants.AddressZero,
  };

  let profileMode = "create";

  export let location; // To get state from Route

  onMount(async () => {
    if (location.state && location.state.name) {
      station = location.state;
      profileMode = "edit";
    }
    // else if ($profileType === "STATION") {
    //   navigate("/station/profile");
    // }
  });

  const submitHandler = async () => {
    const complaintPortal = await connectingWithComplaintPortal();

    const {
      name,
      addr,
      district,
      landmark,
      stationType,
      mobile,
      nameOfCI,
      nameOfSI,
    } = station;

    if (profileMode === "edit") {
      const profileUpdated = await complaintPortal.updateStationProfile(
        name,
        addr,
        district,
        landmark,
        stationType,
        mobile,
        nameOfCI,
        nameOfSI
      );
      await profileUpdated.wait();
    } else {
      const profileCreated = await complaintPortal.createStationProfile(
        station
      );
      await profileCreated.wait();
    }

    navigate("/station/profile");

    // const listOfStations = await policeContract.getAllPoliceStations();
    // console.log(listOfStations);

    // const address = ethers.utils.getAddress(
    //   "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
    // );
    // const approvedstation = await policeContract.approveStationProfile(
    //   address,
    //   true
    // );

    // let stationProfileCreated = await policeContract.getStationDetails();
    // console.log(stationProfileCreated, "Details of station created 2");
  };
</script>

<div class="w-full max-w-md mx-auto my-5">
  <div class="bg-white rounded-lg shadow-lg p-6 mt-5">
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="station-name">
          Station Name
        </label>
        <input
          bind:value={station.name}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="station-name"
          type="text"
          placeholder="Enter Station Name"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="address">
          Address
        </label>
        <input
          bind:value={station.addr}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="address"
          type="text"
          placeholder="Enter Address"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="district">
          District
        </label>
        <input
          bind:value={station.district}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="district"
          type="text"
          placeholder="Enter District"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="landmark">
          Landmark
        </label>
        <input
          bind:value={station.landmark}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="landmark"
          type="text"
          placeholder="Enter Landmark"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="station-type">
          Station Type
        </label>
        <select
          bind:value={station.stationType}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="station-type"
        >
          <option value="">Select Station Type</option>
          {#each stationTypes as type}
            <option value={type}>{type}</option>
          {/each}
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="mobile-number">
          Mobile Number
        </label>
        <input
          bind:value={station.mobile}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="mobile-number"
          type="text"
          placeholder="Enter Mobile Number"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="ci-name">
          Name of Current CI
        </label>
        <input
          bind:value={station.nameOfCI}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="ci-name"
          type="text"
          placeholder="Enter Name of Current CI"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="si-name">
          Name of Current SI
        </label>
        <input
          bind:value={station.nameOfSI}
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="si-name"
          type="text"
          placeholder="Enter Name of Current SI"
        />
      </div>
      <button
        on:click|preventDefault={submitHandler}
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Update Profile
      </button>
    </form>
  </div>
</div>
