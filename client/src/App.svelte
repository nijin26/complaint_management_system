<script>
  import "./app.css";
  import { metamask } from "./lib/Store.js";
  import { Router, Route } from "svelte-routing";

  // Components
  import NavBar from "./lib/Components/NavBar.svelte";
  import Home from "./pages/Home.svelte";
  import Profile from "./pages/Profile.svelte";
  import PoliceDashboard from "./pages/Police/PoliceDashboard.svelte";
  import Complaint from "./pages/Complaints/Complaint.svelte";
  // Superior
  import EditProfile from "./pages/Superior/EditProfile.svelte";
  import ListofStations from "./pages/Superior/ListofStations.svelte";

  //Station
  import EditStationProfile from "./pages/Police/EditStationProfile.svelte";
  import About from "./pages/About.svelte";

  //Complaints
  import UserRegisteredComplaintsList from "./pages/Complaints/UserRegisteredComplaintsList.svelte";
  import ComplaintsAgainstUser from "./pages/Complaints/ComplaintsAgainstUser.svelte";
  import PoliceComplaint from "./pages/Complaints/PoliceComplaint.svelte";

  $: {
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length !== 0)
        metamask.set({ connected: true, address: accounts[0] });
      else metamask.set({ connected: false, address: "" });
    });
  }
</script>

<div>
  <NavBar />
  <main>
    <Router>
      <Route component={Home} />
      <Route path="/About" component={About} />
      <Route path="/superior/profile/edit" component={EditProfile} />
      <Route path="/superior/stations" component={ListofStations} />

      <Route path="/station/profile/edit" component={EditStationProfile} />
      <Route path="/station/profile/edit" component={EditStationProfile} />

      {#if $metamask.connected}
        <Route path="/filecomplaint" component={Complaint} />
        <Route path="/complaints" component={UserRegisteredComplaintsList} />
        <Route path="/complaints/against" component={ComplaintsAgainstUser} />
        <Route path="/police/complaint" component={PoliceComplaint} />
        <Route path="/profile" component={Profile} />
        <Route path="/police/dashboard" component={PoliceDashboard} />
      {/if}
    </Router>
  </main>
</div>

<style>
  :global(body) {
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Josefin Sans", sans-serif;
    font-family: "Poppins", sans-serif;
  }
</style>
