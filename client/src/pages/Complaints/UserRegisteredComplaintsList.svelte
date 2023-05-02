<script>
  const complaints = [
    {
      id: 1,
      subject: "Missing person",
      date: "2023-04-28",
    },
    {
      id: 2,
      subject: "Theft",
      date: "2023-04-29",
    },
    {
      id: 3,
      subject: "Assault",
      date: "2023-04-30",
    },
  ];

  let isModalOpen = false;

  const viewDetailsHandler = () => {
    isModalOpen = true;
  };

  const viewFIRHandler = () => {
    isModalOpen = false;
  };
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
        <td class="px-4 py-2">{complaint.subject}</td>
        <td class="px-4 py-2">{complaint.date}</td>
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
            <span class="font-bold">Station Name:</span> Example Station
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Location/Place:</span> Example Location
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">District:</span> Example District
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Station Type:</span> Example Type
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Address:</span> Example Address
          </p>
          <p class="text-gray-600 mb-2">
            <span class="font-bold">Mobile Number:</span> 1234567890
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
