import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ToastContainer, Zoom } from "react-toastify";
import Layout from "../Components/Layout";
import "../public/globals.css";

import "react-toastify/dist/ReactToastify.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "localhost";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={activeChain}>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={true}
        transition={Zoom}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThirdwebProvider>
  );
}

export default MyApp;
