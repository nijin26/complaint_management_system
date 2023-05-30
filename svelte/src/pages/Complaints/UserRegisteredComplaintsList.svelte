<script>
  import { onMount } from "svelte";
  import { connectingWithComplaintPortal } from "../../lib/Contract";

  const complaints = [
    {
      id: 0,
      complaintNature: "",
      complaintSubject: "",
      complaintDescription: "",
      dateAndTime: "",
      placeOfIncident: "",
      landmark: "",
      district: "",
      policeStation: "",
      officeToFileComplaint: "",
    },
  ];

  let isModalOpen = false;

  const viewDetailsHandler = () => {
    isModalOpen = true;
  };

  const viewFIRHandler = () => {
    isModalOpen = false;
  };

  onMount(async () => {
    const complaintPortal = await connectingWithComplaintPortal();
    const complaint = await complaintPortal.getComplaintDetailsById(0);
    complaints[0].complaintNature = complaint[0].complaintNature;
    complaints[0].complaintSubject = complaint[0].complaintSubject;
    complaints[0].complaintDescription = complaint[0].complaintDescription;
    complaints[0].placeOfIncident = complaint[0].placeOfIncident;
    complaints[0].landmark = complaint[0].landmark;
    complaints[0].district = complaint[0].district;
    complaints[0].policeStation = complaint[0].policeStation;
    complaints[0].officeToFileComplaint = complaint[0].officeToFileComplaint;

    //Convert & set date and time
    const dateTime = new Date(complaint[0].dateAndTime.toLocaleString());
    complaints[0].dateAndTime = dateTime.toLocaleString();
  });
</script>

<table class="table-auto w-full my-4">
  <thead>
    <tr>
      <th class="px-4 py-2">#</th>
      <th class="px-4 py-2">Subject</th>
      <th class="px-4 py-2">Date of Complaint</th>
      <th class="px-4 py-2">View Details</th>
    </tr>
  </thead>
  <tbody>
    {#each complaints as complaint}
      <tr class="border-b hover:bg-gray-100 text-center">
        <td class="px-4 py-2">{complaint.id}</td>
        <td class="px-4 py-2">{complaint.complaintSubject}</td>
        <td class="px-4 py-2">{complaint.dateAndTime}</td>
        <td class="px-4 py-2">
          <button
            on:click={viewDetailsHandler}
            class="border border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500 font-bold py-2 px-4 rounded"
          >
            View Details
          </button>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<!-- Modal backdrop -->
{#if isModalOpen}
  <div
    class="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 flex justify-center items-center"
  >
    <!-- Modal container -->
    <div class="bg-white rounded-md shadow-lg overflow-hidden max-w-lg w-full">
      <!-- Modal header -->
      <div class="bg-gray-100 py-2 px-4 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-800">Your Complaints</h3>
        <button
          class="text-gray-500 hover:text-gray-700 focus:outline-none"
          type="button"
          aria-label="Close modal"
          on:click={() => (isModalOpen = false)}
        >
          <svg
            class="h-6 w-6"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- Modal body -->
      <div class="bg-gray-50 px-4 py-6">
        <div class="mb-4">
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Station Name:</span>
            {complaints[0].policeStation}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Location/Place:</span>
            {complaints[0].placeOfIncident}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">District:</span>
            {complaints[0].district}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Station Type:</span>
            {complaints[0].officeToFileComplaint}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Landmark:</span>
            {complaints[0].landmark}
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Description:</span>
            {complaints[0].complaintDescription}
          </p>
        </div>
        <!-- Modal footer -->
        <div class="flex justify-end">
          <button
            on:click={viewFIRHandler}
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
            type="button">View FIR</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
