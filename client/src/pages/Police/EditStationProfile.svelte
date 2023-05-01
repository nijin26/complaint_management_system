<script>
  import { stationTypes } from "../../lib/Lists";
</script>

<div class="w-full max-w-md mx-auto my-5">
  <div class="bg-white rounded-lg shadow-lg p-6 mt-5">
    <form>
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="station-name">
          Station Name
        </label>
        <input
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
          required
          class="border rounded-lg py-2 px-3 w-full"
          id="si-name"
          type="text"
          placeholder="Enter Name of Current SI"
        />
      </div>
      <button
        class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Save Profile
      </button>
    </form>
  </div>
</div>
