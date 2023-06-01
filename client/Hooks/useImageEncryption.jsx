import CryptoJS from "crypto-js";

const useImageEncryption = () => {
  const encryptImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageData = e.target.result;
        // Convert the ArrayBuffer to WordArray
        const wordArray = CryptoJS.lib.WordArray.create(imageData);
        // Perform encryption using AES
        const encrypted = CryptoJS.AES.encrypt(
          wordArray,
          process.env.NEXT_PUBLIC_SECRET_KEY
        ).toString();
        resolve(encrypted);
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return encryptImage;
};

export default useImageEncryption;
