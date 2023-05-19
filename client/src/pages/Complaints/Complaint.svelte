<script>
  import { navigate } from "svelte-routing";
  import { complaintNature, districts } from "../../lib/Lists";
  import { getPoliceStation, stationTypes } from "../../lib/Lists";
  import { connectingWithComplaintPortal } from "../../lib/Contract";

  const complaint = {
    complaintNature: "",
    placeOfIncident: "",
    dateAndTime: "",
    policeStation: "",
    officeToFileComplaint: "",
    district: "",
    subject: "",
    complaintDescription: "",
  };

  let policeStationOptions;

  $: {
    policeStationOptions = getPoliceStation(complaint.district || "Kollam");
  }

  const submitHandler = async () => {
    console.log("submith handler to add complaint is called", complaint);
    const complaintPortal = await connectingWithComplaintPortal();
    const complaintAdded = await complaintPortal.addComplaint(complaint);
    await complaintAdded.wait();
    console.log("Complaint adding is done");
    alert("Complaint is successfully added");
    // navigate("/complaints");
  };
</script>

<div class="max-w-md mx-auto mb-10">
  <h2 class="text-xl font-bold font-sans text-center my-11 uppercase">
    File a Complaint or Offence
  </h2>
  <form class="mt-8 space-y-6" on:submit|preventDefault={submitHandler}>
    <div>
      <label
        for="complaintNature"
        class="block text-sm font-medium text-gray-700"
      >
        Complaint Nature
      </label>
      <select
        required
        id="complaintNature"
        name="complaintNature"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        bind:value={complaint.complaintNature}
      >
        <option value="" disabled>Select complaint nature</option>
        {#each complaintNature as nature}
          <option>{nature}</option>
        {/each}
      </select>
    </div>

    <div>
      <label
        for="placeOfIncident"
        class="block text-sm font-medium text-gray-700"
      >
        Place of Incident
      </label>
      <input
        required
        type="text"
        id="placeOfIncident"
        name="placeOfIncident"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        bind:value={complaint.placeOfIncident}
      />
    </div>

    <div>
      <label for="dateAndTime" class="block text-sm font-medium text-gray-700">
        Date and Time
      </label>
      <input
        required
        id="dateAndTime"
        name="dateAndTime"
        type="datetime-local"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        placeholder="Enter date and time"
        bind:value={complaint.dateAndTime}
      />
    </div>

    <div>
      <label for="district" class="block text-gray-700 font-bold mb-2"
        >District</label
      >
      <select
        required
        id="district"
        name="district"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        bind:value={complaint.district}
      >
        <option value="">-- Select District --</option>
        {#each districts as district}
          <option value={district}>{district}</option>
        {/each}
      </select>
    </div>

    <div>
      <label
        for="policeStation"
        class="block text-sm font-medium text-gray-700"
      >
        Police Station
      </label>
      <select
        required
        id="policeStation"
        name="policeStation"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        bind:value={complaint.policeStation}
      >
        <option value="" disabled>Select police station</option>
        {#each policeStationOptions as station}
          <option>{station}</option>
        {/each}
      </select>
    </div>
    <div>
      <label
        for="policeStation"
        class="block text-sm font-medium text-gray-700"
      >
        Office to File Complaint
      </label>
      <select
        required
        id="policeStation"
        name="policeStation"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        bind:value={complaint.officeToFileComplaint}
      >
        <option value="" disabled>Select station type</option>
        {#each stationTypes as stationType}
          <option>{stationType}</option>
        {/each}
      </select>
    </div>
    <div class="my-4">
      <label for="complaintSubject" class="block text-gray-700 font-bold mb-2"
        >Complaint Subject</label
      >
      <input
        bind:value={complaint.subject}
        type="text"
        required
        id="complaintSubject"
        name="complaintSubject"
        class="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        placeholder="Enter Complaint Subject"
      />
    </div>
    <div class="my-4">
      <label
        for="complaintDescription"
        class="block text-gray-700 font-bold mb-2">Complaint Description</label
      >
      <textarea
        bind:value={complaint.complaintDescription}
        required
        id="complaintDescription"
        name="complaintDescription"
        class="w-full h-32 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline-blue focus:border-blue-300"
        placeholder="Enter Complaint Description"
      />
    </div>
    <button
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      type="submit"
    >
      Register Complaint
    </button>
  </form>
</div>
