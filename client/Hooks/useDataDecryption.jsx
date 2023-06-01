import CryptoJS from "crypto-js";

const useDataDecryption = () => {
  const decryptData = (encryptedData) => {
    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      process.env.NEXT_PUBLIC_SECRET_KEY
    );
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  };

  return decryptData;
};

export default useDataDecryption;
