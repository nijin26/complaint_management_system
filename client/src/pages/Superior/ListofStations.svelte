<script>
  const stationName = "Kulathupuzha",
    location = "Kulathupuzha",
    district = "Kollam",
    stationType = "",
    address = "",
    mobileNumber = "";

  let isModalOpen = false;

  const data = [
    {
      stationName: "Station A",
      dateOfRequest: "2023-04-28",
      district: "District A",
    },
    {
      stationName: "Station B",
      dateOfRequest: "2023-04-29",
      district: "District B",
    },
    {
      stationName: "Station C",
      dateOfRequest: "2023-04-30",
      district: "District C",
    },
    {
      stationName: "Station D",
      dateOfRequest: "2023-05-01",
      district: "District D",
    },
  ];

  const viewDetailsHandler = () => {
    isModalOpen = true;
    console.log("View details handler function is called");
  };

  const approveHandler = () => {
    isModalOpen = false;
    console.log("Approve handler is called");
  };
</script>

<div class="w-full overflow-x-auto">
  <table class="w-full">
    <thead>
      <tr class="bg-gray-100">
        <th class="px-4 py-2">#</th>
        <th class="px-4 py-2">Station Name</th>
        <th class="px-4 py-2">Date of Request</th>
        <th class="px-4 py-2">District</th>
        <th class="px-4 py-2">View Details</th>
      </tr>
    </thead>
    <tbody>
      <!-- Loop through your data and create a row for each item -->
      {#each data as item, i}
        <tr class={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
          <td class="border px-4 py-2">{i + 1}</td>
          <td class="border px-4 py-2">{item.stationName}</td>
          <td class="border px-4 py-2">{item.dateOfRequest}</td>
          <td class="border px-4 py-2">{item.district}</td>
          <td class="border px-4 py-2">
            <button
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              on:click={viewDetailsHandler}>View Details</button
            >
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<!-- Modal backdrop -->
{#if isModalOpen}
  <div
    class="fixed inset-0 z-40 bg-gray-500 bg-opacity-75 flex justify-center items-center"
  >
    <!-- Modal container -->
    <div class="bg-white rounded-md shadow-lg overflow-hidden max-w-lg w-full">
      <!-- Modal header -->
      <div class="bg-gray-100 py-2 px-4 flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-800">
          Police Station Details
        </h3>
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
            on:click={approveHandler}
            class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none"
            type="button">Approve</button
          >
        </div>
      </div>
    </div>
  </div>
{/if}
