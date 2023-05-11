<script>
  import "./app.css";
  import { metamask, profileType } from "./lib/Store.js";
  import { Router, Route, navigate } from "svelte-routing";

  // Components
  import NavBar from "./lib/Components/NavBar.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Profile from "./pages/Profile.svelte";
  import Complaint from "./pages/Complaints/Complaint.svelte";
  // Superior
  import EditProfile from "./pages/Superior/EditProfile.svelte";
  import ListofStations from "./pages/Superior/ListofStations.svelte";

  //Station
  import StationLogin from "./pages/Station/StationLogin.svelte";
  import EditStationProfile from "./pages/Station/EditStationProfile.svelte";

  //Complaints
  import UserRegisteredComplaintsList from "./pages/Complaints/UserRegisteredComplaintsList.svelte";
  import ComplaintsAgainstUser from "./pages/Complaints/ComplaintsAgainstUser.svelte";
  import PoliceComplaint from "./pages/Complaints/PoliceComplaint.svelte";
  import StationProfile from "./pages/Station/StationProfile.svelte";
  import SuperiorLogin from "./pages/Superior/SuperiorLogin.svelte";
  import { connectingWithComplaint } from "./lib/Contract";

  $: {
    window.ethereum.on("accountsChanged", async (accounts) => {
      console.log("Account changeds");
      if (accounts.length !== 0) {
        metamask.set({ connected: true, address: accounts[0] });
      } else {
        metamask.set({ connected: false, address: "" });
        localStorage.setItem("profileType", "");
        profileType.set("");
      }
    });
  }
</script>

<div>
  <NavBar />
  <main>
    <Router>
      <Route component={Home} />
      <Route path="/About" component={About} />

      <Route path="/superior" component={SuperiorLogin} />

      <Route path="/station" component={StationLogin} />
      <!-- <Route path="/station/profile/edit" component={EditStationProfile} /> -->

      {#if $metamask.connected}
        <Route path="/filecomplaint" component={Complaint} />
        <Route path="/complaints" component={UserRegisteredComplaintsList} />
        <Route path="/complaints/against" component={ComplaintsAgainstUser} />
        <Route path="/police/complaint" component={PoliceComplaint} />
        <Route path="/profile" component={Profile} />
      {/if}

      {#if $metamask.connected && $profileType === "STATION"}
        <Route path="/station/profile/edit" component={EditStationProfile} />
        <Route path="/station/profile" component={StationProfile} />
      {/if}

      {#if $metamask.connected && $profileType === "SUPERIOR"}
        <Route path="/superior/profile/edit" component={EditProfile} />
        <Route path="/superior/stations" component={ListofStations} />
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
