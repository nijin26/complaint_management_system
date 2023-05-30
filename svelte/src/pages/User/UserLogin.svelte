<script>
  import { connectToWallet } from "../../lib/Contract";
  import { metamask, profileType } from "../../lib/Store";
  import { navigate } from "svelte-routing";
  import { MetaMaskWallet } from "@thirdweb-dev/wallets";

  const handleMetamaskConnect = async () => {
    const wallet = new MetaMaskWallet({});
    const address = await wallet.connect();
    // console.log(address, "address");
    // console.log("wallet metadata", wallet.getMeta());
    // console.log("personal wallet", wallet.getPersonalWallet());
    // const address = await connectToWallet();
    // console.log(address, "address");
    // if (address) {
    //   metamask.set({ connected: true, address: address });
    //   profileType.set("USER");
    //   localStorage.setItem("profileType", "USER");
    //   navigate("/user/profile/edit");
    // } else {
    //   console.log("Authentication Failed");
    // }
  };
</script>

<h1 class="text-center text-2xl font-bold mt-10">Complainant Login</h1>
<div class="flex justify-center items-center h-[50vh]">
  <button class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
    Login With Mobile Number
  </button>
  <button
    on:click={handleMetamaskConnect}
    class="border-2 border-blue-500 text-blue-500 hover:text-blue-800 rounded-md py-2 px-4 mx-4"
    >Connect Metamask Wallet</button
  >
</div>
