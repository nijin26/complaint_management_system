import { useState } from "react";
import Link from "next/link";
import {
  ConnectWallet,
  useConnect,
  magicLink,
  useDisconnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import Button from "./Button";

const Navbar = () => {
  const [phoneNumber, setPhoneNumber] = useState("+919645116496");
  const [isOpen, setIsOpen] = useState(false);
  const connect = useConnect();
  const disconnect = useDisconnect();
  const status = useConnectionStatus();

  const magicLinkConfig = magicLink({
    apiKey: "pk_live_162862A27A5AC661",
  });

  const submitLoginMobile = async (e) => {
    e.preventDefault();
    try {
      setIsOpen(false);
      await connect(magicLinkConfig, { phoneNumber });
      toast.success("Connection Succesfull");
    } catch (err) {
      toast.error("Connection Error. Try Again");
      console.log(err, "magic auth error");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast.success("Disconnected");
  };

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <a href="#" className="flex-shrink-0 flex items-center">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="/logo.svg"
                  alt="Logo"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
                  src="/logo.svg"
                  alt="Logo"
                />
              </a>
              <div className="-my-px ml-6 flex items-center">
                <Link
                  href="/"
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
                >
                  Home
                </Link>
                <Link
                  href="/About"
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              {status === "connected" ? (
                <Button onClick={handleDisconnect}>Disconnect</Button>
              ) : (
                <div>
                  <Button
                    className="mr-2"
                    outlined
                    onClick={() => setIsOpen(true)}
                  >
                    Connect with Mobile Number
                  </Button>

                  <ConnectWallet />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={` fixed inset-0 ${
          isOpen ? "flex" : "hidden"
        } items-center justify-center z-10 `}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={() => setIsOpen(false)}
        ></div>
        <div className="bg-white rounded-md p-6 z-50">
          <h2 className="text-lg font-medium mb-4">Enter Mobile Number</h2>
          <form onSubmit={submitLoginMobile}>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Mobile Number"
            />
            <Button onClick={submitLoginMobile} className="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Navbar;
