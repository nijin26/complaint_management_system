import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Station = () => {
  const status = useConnectionStatus();
  const router = useRouter();
  useEffect(() => {
    if (status === "connected") {
      router.push("/Station/Edit");
      toast.success("Station Wallet connection is success");
    }
  }, [status]);

  return (
    <div className="flex flex-col justify-center items-center h-[70vh]">
      <h1 className="text-center font-bold text-2xl my-3">Police Station</h1>
      <ConnectWallet />
    </div>
  );
};

export default Station;
