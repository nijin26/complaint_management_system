<script>
  import { metamask } from "./lib/Store.js";
  import { Router, Route } from "svelte-routing";

  // Components
  import NavBar from "./lib/Components/NavBar.svelte";
  import Home from "./pages/Home.svelte";
  import Complaint from "./pages/Complaint.svelte";
  import Profile from "./pages/Profile.svelte";

  $: {
    window.ethereum.on("accountsChanged", function (accounts) {
      if (accounts.length !== 0)
        metamask.set({ connected: true, address: accounts[0] });
      else metamask.set({ connected: false, address: "" });
    });
  }
</script>

<div class="app">
  <NavBar />
  <main>
    <Router>
      <Route component={Home} />
      {#if $metamask.connected}
        <Route path="/filecomplaint" component={Complaint} />
        <Route path="/profile" component={Profile} />
      {/if}
    </Router>
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Josefin Sans", sans-serif;
    font-family: "Poppins", sans-serif;
  }
</style>
