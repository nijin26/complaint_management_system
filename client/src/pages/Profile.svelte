<script lang="ts">
  import { ethers } from "ethers";
  import { Input, NativeSelect, Button } from "@svelteuidev/core";
  import { setProfile, viewProfile } from "../lib/Contract";

  const profileInfo = {
    profile: {
      name: "",
      email: "",
      mobile: "",
      age: "",
      gender: "",
      dob: "",
      addr: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    },
    idDetails: {
      selectedID: "",
      IDNumber: "",
    },
    relativeDetails: {
      relativeName: "",
      relativeMobile: "",
      relation: "",
    },
  };

  const { profile, idDetails, relativeDetails } = profileInfo;

  function submitHandler() {
    console.log("submit handler called");
    setProfile(profileInfo);
  }
</script>

<main>
  <h1>PROFILE DETAILS</h1>
  <form class="profile" on:submit|preventDefault={submitHandler}>
    <Input
      type="text"
      required
      variant="default"
      placeholder="Enter your full name*"
      bind:value={profile.name}
    />
    <Input
      type="email"
      required
      variant="default"
      placeholder="Enter valid Email ID*"
      bind:value={profile.email}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Mobile Number*"
      bind:value={profile.mobile}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Age*"
      bind:value={profile.age}
    />
    <NativeSelect
      required
      data={["Male", "Female", "Transgender", "Other"]}
      placeholder="Gender*"
      bind:value={profile.gender}
    />
    <input
      required
      placeholder="Date of Birth* (DD/MM/YY)"
      class="dob"
      type="text"
      id="date"
      bind:value={profile.dob}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="Address*"
      bind:value={profile.addr}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="City*"
      bind:value={profile.city}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="District*"
      bind:value={profile.district}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="State*"
      bind:value={profile.state}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Pincode*"
      bind:value={profile.pincode}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="Relative Name*"
      bind:value={relativeDetails.relativeName}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Relative Mobile Number*"
      bind:value={relativeDetails.relativeMobile}
    />
    <NativeSelect
      required
      data={[
        "Father",
        "Mother",
        "Brother",
        "Sister",
        "Husband",
        "Wife",
        "Son",
        "Daughter",
        "Other",
      ]}
      placeholder="Relation*"
      bind:value={relativeDetails.relation}
    />
    <NativeSelect
      required
      data={["Aadhar", "PAN", "Driving License", "Passport", "Voter ID"]}
      placeholder="ID Type*"
      bind:value={idDetails.selectedID}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="ID Card Number*"
      bind:value={idDetails.IDNumber}
    />
    <Button type="submit" color="teal" radius="md" size="lg" ripple
      >Update Profile</Button
    >
    <button on:click={viewProfile}>View Profile</button>
  </form>
</main>

<style>
  h1 {
    text-align: center;
  }
  main {
    width: 50%;
    margin: 1rem auto;
    padding: 1rem;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .dob {
    height: 36px;
    padding: 0 12px;
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
</style>
