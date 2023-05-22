<script lang="ts">
  import { navigate } from "svelte-routing";
  import { connectingWithComplaintPortal } from "../../lib/Contract";

  // const profileInfo = {
  //   basicDetails: {
  //     name: "",
  //     email: "",
  //     mobile: "",
  //     age: "",
  //     gender: "",
  //     dob: "",
  //     addr: "",
  //     city: "",
  //     district: "",
  //     state: "",
  //     pincode: "",
  //   },
  //   idDetails: {
  //     selectedID: "",
  //     IDNumber: "",
  //   },
  //   relativeDetails: {
  //     relativeName: "",
  //     relativeMobile: "",
  //     relation: "",
  //   },
  // };

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

  const { basicDetails, idDetails, relativeDetails } = profileInfo;

  const submitHandler = async () => {
    const complaintPortalContract = await connectingWithComplaintPortal();
    const profileCreated = await complaintPortalContract.createUser(
      profileInfo
    );
    await profileCreated.wait();

    navigate("/filecomplaint");
  };

  const viewHandler = async () => {
    console.log("View handler is called");

    navigate("/user/profile");
  };
</script>

<main class="w-3/4 md:w-1/2 mx-auto p-4 border border-black rounded-md my-10">
  <h1 class="text-center my-4 text-lg font-bold">PROFILE DETAILS</h1>
  <form class="profile flex flex-col gap-4">
    <input
      type="text"
      required
      class="input-default"
      placeholder="Enter your full name*"
      bind:value={basicDetails.name}
    />
    <input
      type="email"
      required
      class="input-default"
      placeholder="Enter valid Email ID*"
      bind:value={basicDetails.email}
    />
    <input
      type="number"
      required
      class="input-default"
      placeholder="Mobile Number*"
      bind:value={basicDetails.mobile}
    />
    <input
      type="number"
      required
      class="input-default"
      placeholder="Age*"
      bind:value={basicDetails.age}
    />
    <select required class="input-default" bind:value={basicDetails.gender}>
      <option disabled selected value="">Gender*</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Transgender">Transgender</option>
      <option value="Other">Other</option>
    </select>
    <input
      required
      placeholder="Date of Birth* (DD/MM/YY)"
      class="dob"
      type="text"
      id="date"
      bind:value={basicDetails.dob}
    />
    <input
      type="text"
      required
      class="input-default"
      placeholder="Address*"
      bind:value={basicDetails.addr}
    />
    <input
      type="text"
      required
      class="input-default"
      placeholder="City*"
      bind:value={basicDetails.city}
    />
    <input
      type="text"
      required
      class="input-default"
      placeholder="District*"
      bind:value={basicDetails.district}
    />
    <input
      type="text"
      required
      class="input-default"
      placeholder="State*"
      bind:value={basicDetails.state}
    />
    <input
      type="number"
      required
      class="input-default"
      placeholder="Pincode*"
      bind:value={basicDetails.pincode}
    />
    <input
      type="text"
      required
      class="input-default"
      placeholder="Relative Name*"
      bind:value={relativeDetails.relativeName}
    />
    <input
      type="number"
      required
      class="input-default"
      placeholder="Relative Mobile Number*"
      bind:value={relativeDetails.relativeMobile}
    />
    <select
      required
      class="input-default"
      bind:value={relativeDetails.relation}
    >
      <option disabled selected value="">Relation*</option>
      <option value="Father">Father</option>
      <option value="Mother">Mother</option>
      <option value="Brother">Brother</option>
      <option value="Sister">Sister</option>
      <option value="Husband">Husband</option>
      <option value="Wife">Wife</option>
      <option value="Son">Son</option>
      <option value="Daughter">Daughter</option>
      <option value="Other">Other</option>
    </select>
    <select required class="input-default" bind:value={idDetails.selectedID}>
      <option disabled selected value="">ID Type*</option>
      <option value="Aadhar">Aadhar</option>
      <option value="PAN">PAN</option>
      <option value="Driving License">Driving License</option>
      <option value="Passport">Passport</option>
      <option value="Voter ID">Voter ID</option>
    </select>
    <input
      type="text"
      required
      class="input-default"
      placeholder="ID Card Number*"
      bind:value={idDetails.IDNumber}
    />
    <button
      on:click|preventDefault={submitHandler}
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Save Profile
    </button>
    <button
      on:click|preventDefault={viewHandler}
      class="border-2 border-blue-500 rounded-md py-2 px-4 mt-2"
      >View Profile</button
    >
  </form>
</main>

<style>
  .input-default {
    height: 36px;
    padding: 0 12px;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }

  .dob {
    height: 36px;
    padding: 0 12px;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
</style>
