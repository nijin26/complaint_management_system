<script>
  import { connectToMetaMask } from "../MetaMask";
  import { metamask } from "../Store";
  import { Button } from "@svelteuidev/core";
</script>

<nav>
  <ul>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/About">About</a>
    </li>
    {#if $metamask.connected}
      <Button variant="outline" color="orange" uppercase ripple
        >Wallet Connected</Button
      >
    {:else}
      <Button color="orange" uppercase ripple on:click={connectToMetaMask}
        >Connect Wallet</Button
      >
    {/if}
  </ul>
</nav>

<style>
  nav {
    background-color: #000000;
    color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  nav > ul {
    margin: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    list-style: none;
    font-size: large;
  }

  ul > li > a {
    margin: 0 1rem;
    text-decoration: none;
    color: white;
  }

  ul > li > a:hover {
    color: #ff8c00;
  }
</style>
