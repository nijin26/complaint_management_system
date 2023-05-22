<script>
  import { onMount } from "svelte";

  import { connectingWithComplaintPortal } from "../../lib/Contract";
  import { navigate } from "svelte-routing";

  let stationData = {
    name: "",
    addr: "",
    district: "",
    landmark: "",
    stationType: "",
    mobile: 0,
    nameOfCI: "",
    nameOfSI: "",
    approved: false,
    approvedBy: "",
  };

  onMount(async () => {
    const ComplaintPortal = await connectingWithComplaintPortal();

    const stationProfile = await ComplaintPortal.getStationDetails();
    console.log(stationProfile, "station profile");
    stationData.name = stationProfile[0];
    stationData.addr = stationProfile[1];
    stationData.district = stationProfile[2];
    stationData.landmark = stationProfile[3];
    stationData.stationType = stationProfile[4];
    stationData.mobile = stationProfile[5].toNumber();
    stationData.nameOfCI = stationProfile[6];
    stationData.nameOfSI = stationProfile[7];
    stationData.approved = stationProfile[8];
    // stationData.approvedBy = stationProfile[9];
  });

  const updateProfile = async () => {
    navigate("/station/profile/edit", { state: stationData });
  };
</script>

<div class="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 my-6">
  <h2 class="text-xl font-bold text-gray-900 mb-4">Station Profile</h2>

  <div class="border border-gray-200 rounded-lg p-4 mb-4">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="font-bold text-gray-700">Name:</p>
        <p>{stationData.name}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Address:</p>
        <p>{stationData.addr}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">District:</p>
        <p>{stationData.district}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Landmark:</p>
        <p>{stationData.landmark}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Station Type:</p>
        <p>{stationData.stationType}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Mobile:</p>
        <p>{stationData.mobile}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Name of CI:</p>
        <p>{stationData.nameOfCI}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Name of SI:</p>
        <p>{stationData.nameOfSI}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Approved:</p>
        <p>{stationData.approved ? "Yes" : "No"}</p>
      </div>

      <div>
        <p class="font-bold text-gray-700">Approved By:</p>
        <p>{stationData.approvedBy}</p>
      </div>
    </div>
  </div>

  <div class="flex justify-center">
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      on:click={updateProfile}
    >
      Edit Profile
    </button>
    <button
      disabled
      class="mx-2 border-blue-600 border-2 hover:bg-blue-200 text-black font-bold py-2 px-4 rounded cursor-not-allowed"
    >
      Manage Complaints
    </button>
  </div>
</div>
