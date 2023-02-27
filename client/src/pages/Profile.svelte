<script>
  import { Input, NativeSelect, Button } from "@svelteuidev/core";

  const userDetails = {
    name: "",
    email: "",
    mobile: "",
    age: "",
    gender: "",
    dob: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    relativeName: "",
    relativeMobile: "",
    relation: "",
    selectedID: "",
    IDNumber: "",
  };
  function submitHandler() {
    console.log("submit handler called");
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
      bind:value={userDetails.name}
    />
    <Input
      type="email"
      required
      variant="default"
      placeholder="Enter valid Email ID*"
      bind:value={userDetails.email}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Mobile Number*"
      bind:value={userDetails.mobile}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Age*"
      bind:value={userDetails.age}
    />
    <NativeSelect
      required
      data={["Male", "Female", "Transgender", "Other"]}
      placeholder="Gender*"
      bind:value={userDetails.gender}
    />
    <input
      required
      placeholder="Date of Birth* (DD/MM/YY)"
      class="dob"
      type="text"
      id="date"
      bind:value={userDetails.dob}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="Address*"
      bind:value={userDetails.address}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="City*"
      bind:value={userDetails.city}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="District*"
      bind:value={userDetails.district}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="State*"
      bind:value={userDetails.state}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Pincode*"
      bind:value={userDetails.pincode}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="Relative Name*"
      bind:value={userDetails.relativeName}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="Relative Mobile Number*"
      bind:value={userDetails.relativeMobile}
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
      bind:value={userDetails.relation}
    />
    <NativeSelect
      required
      data={["Aadhar", "PAN", "Driving License", "Passport", "Voter ID"]}
      placeholder="ID Type*"
      bind:value={userDetails.selectedID}
    />
    <Input
      type="number"
      required
      variant="default"
      placeholder="ID Card Number*"
      bind:value={userDetails.IDNumber}
    />
    <Button type="submit" color="teal" radius="md" size="lg" ripple
      >Update Profile</Button
    >
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
    border: 1px solid grey;
    border-radius: 3px;
  }
</style>
