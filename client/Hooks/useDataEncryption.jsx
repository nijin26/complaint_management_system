import CryptoJS from "crypto-js";

const useDataEncryption = () => {
  const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      process.env.NEXT_PUBLIC_SECRET_KEY
    ).toString();
    return encryptedData;
  };

  return encryptData;
};

export default useDataEncryption;
