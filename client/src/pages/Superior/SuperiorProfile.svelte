<script>
  import { onMount } from "svelte";
  import { navigate, Link } from "svelte-routing";
  import { ethers } from "ethers";

  import { connectingWithComplaintPortal } from "../../lib/Contract";

  // let superiorProfile = {
  //   name: "",
  //   email: "",
  //   mobile: "",
  //   aadharId: "",
  //   rank: "",
  //   designation: "",
  //   unit: "",
  // };

  let superiorProfile = {
    name: "Nijin Doe",
    email: "john.doe@example.com",
    mobile: 1234567890,
    aadharID: "123456789012",
    rank: "Inspector",
    designation: "Commissioner of Police",
    unit: "Narcotics Control Bureau",
    approved: false,
    approvedBy: ethers.constants.AddressZero,
  };
  onMount(async () => {
    const complaintPortal = await connectingWithComplaintPortal();

    const data = await complaintPortal.getSuperiorProfileDetails();
    console.log(data);
    superiorProfile.name = data[0] || "";
    superiorProfile.email = data[1] || "";
    superiorProfile.mobile = data[2] ? data[2].toString() : "";
    superiorProfile.aadharID = data[3] ? data[3].toString() : "";
    superiorProfile.rank = data[4] || "";
    superiorProfile.designation = data[5] || "";
    superiorProfile.unit = data[6] || "";
  });

  const updateProfile = async () => {
    navigate("/superior/profile/edit", { state: superiorProfile });
  };

  const buttonStyles =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
</script>

<div class="max-w-md mx-auto my-4">
  <div class="bg-white shadow-md rounded-md p-6 space-y-4">
    <h2 class="text-2xl font-bold">Superior Profile</h2>
    <p><strong>Name:</strong> {superiorProfile.name}</p>
    <p><strong>Email:</strong> {superiorProfile.email}</p>
    <p><strong>Mobile:</strong> {superiorProfile.mobile}</p>
    <p><strong>Aadhar ID:</strong> {superiorProfile.aadharId}</p>
    <p><strong>Rank:</strong> {superiorProfile.rank}</p>
    <p><strong>Designation:</strong> {superiorProfile.designation}</p>
    <p><strong>Unit:</strong> {superiorProfile.unit}</p>
    <button
      on:click={updateProfile}
      class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Edit
    </button>
  </div>
</div>

<div class="flex justify-center">
  <Link to="/" class={buttonStyles}>Manage Complaints</Link>
  <Link to="/" class={`${buttonStyles} ml-4 bg-green-500 hover:bg-green-700`}
    >Manage Police Stations</Link
  >
</div>
