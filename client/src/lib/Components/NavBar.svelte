<script>
  import { navigate } from "svelte-routing";
  import { checkIfWalletConnected, connectToWallet } from "../Contract";
  import { metamask, profileType } from "../Store";

  const disconnectWallet = async () => {
    const address = await checkIfWalletConnected();
    if (address) {
      metamask.set({ connected: false, address: "" });
      profileType.set("");
      localStorage.setItem("profileType", "");
      navigate("/");
    } else {
      console.log("Authentication Failed");
    }
  };
</script>

<nav class="bg-white shadow-md">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <a href="#" class="flex-shrink-0 flex items-center">
          <img class="block lg:hidden h-8 w-auto" src="/logo.svg" alt="Logo" />
          <img class="hidden lg:block h-8 w-auto" src="/logo.svg" alt="Logo" />
        </a>
        <div class="-my-px ml-6 flex items-center">
          <a
            href="/"
            class="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
            >Home</a
          >
          <a
            href="/About"
            class="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
            >About</a
          >
          <a
            href="#"
            class="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
            >Locate Stations</a
          >
        </div>
      </div>
      <div class="flex items-center">
        {#if $metamask.connected}
          <button
            on:click={disconnectWallet}
            class="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >Logout</button
          >
        {:else}
          <button
            on:click={connectToWallet}
            class="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >Login</button
          >
        {/if}
      </div>
    </div>
  </div>
</nav>
