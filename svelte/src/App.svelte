<script>
  import "./app.css";
  import { metamask, profileType } from "./lib/Store.js";
  import { Router, Route, navigate } from "svelte-routing";

  // Components
  import NavBar from "./lib/Components/NavBar.svelte";
  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Complaint from "./pages/Complaints/Complaint.svelte";
  // Superior
  import EditSuperiorProfile from "./pages/Superior/EditSuperiorProfile.svelte";
  import SuperiorProfile from "./pages/Superior/SuperiorProfile.svelte";
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

  //User
  import EditUserProfile from "./pages/User/EditUserProfile.svelte";

  import { connectingWithComplaintPortal } from "./lib/Contract";
  import ViewUserProfile from "./pages/User/ViewUserProfile.svelte";
  import UserLogin from "./pages/User/UserLogin.svelte";

  $: {
    window.ethereum.on("accountsChanged", async (accounts) => {
      if (accounts.length !== 0) {
        metamask.set({ connected: true, address: accounts[0] });
        // const complaintPortal = await connectingWithComplaintPortal()
        // const userRole = await complaintPortal.
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
      <Route path="/station/profile/edit" component={EditStationProfile} />
      <Route path="/user/login" component={UserLogin} />
      <Route path="/user/profile/edit" component={EditUserProfile} />
      <Route path="/user/profile" component={ViewUserProfile} />
      <Route path="/filecomplaint" component={Complaint} />
      <Route path="/complaints" component={UserRegisteredComplaintsList} />
      <Route path="/complaints/against" component={ComplaintsAgainstUser} />
      <Route path="/station/complaint" component={PoliceComplaint} />
      <Route path="/station/profile" component={StationProfile} />
      <Route path="/superior/profile" component={SuperiorProfile} />
      <Route path="/superior/profile/edit" component={EditSuperiorProfile} />
      <Route path="/superior/stations" component={ListofStations} />

      <!-- {#if $metamask.connected}
        <Route path="/user/profile/edit" component={EditUserProfile} />
        <Route path="/filecomplaint" component={Complaint} />
        <Route path="/complaints" component={UserRegisteredComplaintsList} />
        <Route path="/complaints/against" component={ComplaintsAgainstUser} />
        <Route path="/station/complaint" component={PoliceComplaint} />
      {/if}

      {#if $metamask.connected}
        <Route path="/station/profile" component={StationProfile} />
      {/if}

      {#if $metamask.connected}
        <Route path="/superior/profile" component={SuperiorProfile} />
        <Route path="/superior/profile/edit" component={EditSuperiorProfile} />
        <Route path="/superior/stations" component={ListofStations} />
      {/if} -->
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
