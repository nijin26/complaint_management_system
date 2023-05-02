<script>
  let dateAndTime = "";
  let place = "";
  let complainantDetails = "";
  let searchDetails = "";
  let subject = "";
  let offenceDescription = "";
  let ipc = "";
  let accusedDetails = "";
  let witnessSearch = "";
  let evidenceDescription = "";
  let policeStationSearch = "";
  let latestRemarks = "";
  let status = "";

  function registerComplaint() {
    // handle registering complaint
  }
</script>

<div
  class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 my-6"
>
  <h1 class="text-2xl font-semibold mb-6">Register Complaint</h1>
  <form>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="dateAndTime">
        Date &amp; Time of Incident
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="dateAndTime"
        type="datetime-local"
        placeholder="Date &amp; Time"
        bind:value={dateAndTime}
        required
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="place">
        Place
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="place"
        type="text"
        placeholder="Place"
        bind:value={place}
        required
      />
    </div>
    <div class="mb-4">
      <label
        class="block text-gray-700 font-bold mb-2"
        for="complainantDetails"
      >
        Details of Complainant
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="complainantDetails"
        type="text"
        placeholder="Details of Complainant"
        bind:value={complainantDetails}
        required
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="searchDetails">
        Search Details by User Name
      </label>
      <div class="flex items-center">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
          id="searchDetails"
          type="text"
          placeholder="Search by User Name"
          bind:value={searchDetails}
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
        >
          Enter Details
        </button>
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="subject">
        Subject
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="subject"
        type="text"
        placeholder="Subject"
        bind:value={subject}
        required
      />
    </div>
    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
    >
      <label
        class="text-left block text-gray-700 text-sm font-bold mb-2"
        for="offence-description"
      >
        Description of the Offence
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="offence-description"
        placeholder="Enter description of the offence here..."
      />
    </div>

    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
    >
      <label
        class="text-left block text-gray-700 text-sm font-bold mb-2"
        for="ipc"
      >
        IPC
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="ipc"
        type="text"
        placeholder="Enter IPC section here..."
      />
    </div>

    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
    >
      <label
        class="text-left block text-gray-700 text-sm font-bold mb-2"
        for="accused-details"
      >
        Details of Accused
      </label>
      <div class="flex">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="accused-details"
          type="text"
          placeholder="Enter name of accused or search by user name..."
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
        >
          Search
        </button>
      </div>
    </div>

    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
    >
      <label
        class="text-left block text-gray-700 text-sm font-bold mb-2"
        for="witness-search"
      >
        Search for Witness
      </label>
      <div class="flex">
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="witness-search"
          type="text"
          placeholder="Enter name of witness or search by user name..."
        />
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
        >
          Search
        </button>
      </div>
    </div>

    <div
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2"
    >
      <label
        class="text-left block text-gray-700 text-sm font-bold mb-2"
        for="evidence-description"
      >
        Description of Evidence
      </label>
      <textarea
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="evidence-description"
        placeholder="Enter description of evidence here..."
      />
    </div>

    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="uppercase text-grey-darker text-sm font-bold mb-2"
        for="police-station"
      >
        Search Box for Searching Police Station by Name
      </label>
      <input
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        id="police-station"
        type="text"
        placeholder="Search Police Station by Name"
      />
    </div>

    <div class="md:w-1/2 px-3">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="latest-remarks"
      >
        Latest Remarks
      </label>
      <input
        class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
        id="latest-remarks"
        type="text"
        placeholder="Latest Remarks"
      />
    </div>

    <div class="md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
        for="status"
      >
        Status
      </label>
      <div class="relative">
        <select
          class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-grey"
          id="status"
        >
          <option value="">Select Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
    </div>
    <button
      class="w-full my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
    >
      Search
    </button>
  </form>
</div>
