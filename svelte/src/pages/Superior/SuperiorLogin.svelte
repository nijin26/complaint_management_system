<script>
  import { connectToWallet } from "../../lib/Contract";
  import { metamask, profileType } from "../../lib/Store";

  import { navigate } from "svelte-routing";

  const loginHandler = async () => {
    const address = await connectToWallet();
    if (address) {
      metamask.set({ connected: true, address: address });
      profileType.set("SUPERIOR");
      localStorage.setItem("profileType", "SUPERIOR");
      navigate("/superior/profile/edit");
    } else {
      console.log("Authentication Failed");
    }
  };
</script>

<div class="h-[70vh] flex flex-col items-center justify-center">
  <button
    on:click|preventDefault={loginHandler}
    class="w-50 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type="submit"
  >
    Connect Wallet
  </button>
  <p class="m-2">Authenticate as a Police Superior</p>
</div>
