<script>
  import { Input, NativeSelect, Button } from "@svelteuidev/core";

  import { complaintNature, districts } from "../lib/Lists";
  import { getPoliceStation } from "../lib/ListPoliceStations";

  const complaint = {
    complaintNature: "",
    casteCategory: "",
    placeOfIncident: "",
    dateAndTime: "",
    policeStation: "",
    officeToFileComplaint: "",
    district: "",
    complaintDescription: "",
  };

  const submitHandler = () => {};
</script>

<main>
  <h1>File a Complaint</h1>
  <form class="profile" on:submit|preventDefault={submitHandler}>
    <NativeSelect
      required
      data={complaintNature}
      placeholder="Complaint Nature*"
      bind:value={complaint.complaintNature}
    />
    <NativeSelect
      required
      data={["OBC", "SC/ST", "GENERAL"]}
      placeholder="Caste Category*"
      bind:value={complaint.casteCategory}
    />
    <Input
      type="text"
      required
      variant="default"
      placeholder="Place of Incident*"
      bind:value={complaint.placeOfIncident}
    />
    <input
      required
      placeholder="Date and time of incident*"
      class="dob"
      type="text"
      id="date"
      bind:value={complaint.dateAndTime}
    />
    <NativeSelect
      required
      data={districts}
      placeholder="District*"
      bind:value={complaint.district}
    />
    <NativeSelect
      required
      data={getPoliceStation(complaint.district || "Kollam")}
      placeholder="Police Station*"
      bind:value={complaint.policeStation}
    />

    <Input
      type="text"
      required
      variant="default"
      placeholder="Complaint Description*"
      bind:value={complaint.complaintDescription}
    />
    <textarea
      name="description"
      id="complaintDesc"
      cols="30"
      rows="5"
      value={complaint.complaintDescription}
    />

    <Button type="submit" color="teal" radius="md" size="lg" ripple
      >Register Complaint</Button
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
    border: 1px solid #ced4da;
    border-radius: 3px;
  }
  #complaintDesc {
    padding: 10px;
    border: 1px solid gray;
    border-radius: 3px;
    resize: none;
  }
</style>
