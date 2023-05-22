<!-- App.svelte -->
<script>
  import { onMount } from "svelte";

  import { connectingWithComplaintPortal } from "../../lib/Contract";
  import { navigate } from "svelte-routing";

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

  let properties = [];
  let values = [];

  onMount(async () => {
    const complaintPortal = await connectingWithComplaintPortal();
    const getProfileDetails = await complaintPortal.getUserDetails();
    const [basicDetails, idDetails, relativeDetails] = getProfileDetails;

    console.log(basicDetails, "User profile");
    console.log(idDetails, "User profile");
    console.log(relativeDetails, "User profile");
    properties = Object.keys(profileInfo).reduce((acc, key) => {
      const subProperties = Object.keys(profileInfo[key]);
      return acc.concat(subProperties);
    }, []);

    values = Object.values(profileInfo).reduce((acc, obj) => {
      const subValues = Object.values(obj);
      return acc.concat(subValues);
    }, []);
  });
</script>

<div class="m-4 p-4 bg-white shadow-md grid grid-cols-2 gap-4">
  <h2 class="text-2xl font-bold mb-4 col-span-2">Profile Information</h2>

  {#each properties as property, index}
    <div class="col-span-1">
      <span class="font-bold capitalize">{property}:</span>
      <span class="mb-2">{values[index]}</span>
    </div>
  {/each}
</div>
<div class="flex justify-center">
  <button
    class=" bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-800 transition-colors"
    on:click={() => navigate("/filecomplaint")}>File Complaint</button
  >
</div>
