<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  import { connectingWithSuperior } from "../../lib/Contract";
  import { profileType } from "../../lib/Store";

  let superiorProfile = {
    name: "",
    email: "",
    mobile: "",
    aadharId: "",
    rank: "",
    designation: "",
    unit: "",
  };
  let profileMode = "create";
  export let location;

  onMount(async () => {
    if (location.state && location.state.name) {
      superiorProfile = location.state;
      profileMode = "edit";
    } else if ($profileType === "SUPERIOR") {
      console.log("its a superior");
      navigate("/superior/profile");
    }
  });

  const profileHandler = async () => {
    const superiorContract = await connectingWithSuperior();

    const { name, email, mobile, aadharId, rank, designation, unit } =
      superiorProfile;

    if (profileMode === "edit") {
      const profileUpdated = await superiorContract.updateProfile(
        name,
        email,
        mobile,
        aadharId,
        rank,
        designation,
        unit
      );
      await profileUpdated.wait();
    } else {
      const profileCreated = await superiorContract.createProfile(
        name,
        email,
        mobile,
        aadharId,
        rank,
        designation,
        unit
      );
      await profileCreated.wait();
    }

    navigate("/superior/profile");
  };
</script>

<div class="w-full max-w-md mx-auto">
  <form class="bg-white rounded-lg shadow-lg p-6 mt-5">
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="name">
        Name:
      </label>
      <input
        bind:value={superiorProfile.name}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="Enter your name"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="email">
        Email:
      </label>
      <input
        bind:value={superiorProfile.email}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
        placeholder="Enter your email"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="mobile">
        Mobile:
      </label>
      <input
        bind:value={superiorProfile.mobile}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="mobile"
        type="tel"
        placeholder="Enter your mobile number"
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="aadhar">
        Aadhar ID:
      </label>
      <input
        bind:value={superiorProfile.aadharId}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="aadhar"
        placeholder="Enter your Aadhar ID number."
      />
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="rank">
        Rank:
      </label>
      <select
        bind:value={superiorProfile.rank}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="rank"
      >
        <option value="">Select your rank</option>
        <option value="Constable">Constable</option>
        <option value="Head Constable">Head Constable</option>
        <option value="Assistant Sub-Inspector">Assistant Sub-Inspector</option>
        <option value="Sub-Inspector">Sub-Inspector</option>
        <option value="Inspector">Inspector</option>
        <option value="Deputy Superintendent of Police"
          >Deputy Superintendent of Police</option
        >
        <option value="Superintendent of Police"
          >Superintendent of Police</option
        >
        <option value="Deputy Inspector General of Police"
          >Deputy Inspector General of Police</option
        >
        <option value="Inspector General of Police"
          >Inspector General of Police</option
        >
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="designation">
        Designation:
      </label>
      <select
        bind:value={superiorProfile.designation}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="designation"
      >
        <option value="">Select your designation</option>
        <option value="Station House Officer">Station House Officer</option>
        <option value="Circle Inspector">Circle Inspector</option>
        <option value="Deputy Commissioner of Police"
          >Deputy Commissioner of Police</option
        >
        <option value="Additional Commissioner of Police"
          >Additional Commissioner of Police</option
        >
        <option value="Joint Commissioner of Police"
          >Joint Commissioner of Police</option
        >
        <option value="Commissioner of Police">Commissioner of Police</option>
      </select>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 font-bold mb-2" for="unit">
        Unit:
      </label>
      <select
        bind:value={superiorProfile.unit}
        required
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="unit"
      >
        <option value="">Select your unit</option>
        <option value="Local police station">Local police station</option>
        <option value="Crime Branch">Crime Branch</option>
        <option value="Special Task Force">Special Task Force</option>
        <option value="Anti-Terrorism Squad">Anti-Terrorism Squad</option>
        <option value="Traffic Police">Traffic Police</option>
        <option value="Cyber Crime Cell">Cyber Crime Cell</option>
        <option value="Narcotics Control Bureau"
          >Narcotics Control Bureau</option
        >
        <option value="Intelligence Bureau">Intelligence Bureau</option>
      </select>
    </div>
    <button
      on:click|preventDefault={profileHandler}
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Update Profile
    </button>
  </form>
</div>

<style>
</style>
