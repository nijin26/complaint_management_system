import CryptoJS from "crypto-js";

const useImageDecryption = () => {
  const decryptImage = (encryptedData) => {
    return new Promise((resolve, reject) => {
      // Decrypt the encrypted image data using AES
      const decryptedBytes = CryptoJS.AES.decrypt(
        encryptedData,
        process.env.NEXT_PUBLIC_SECRET_KEY
      );

      try {
        // Convert the WordArray to Uint8Array
        const decryptedArray = new Uint8Array(decryptedBytes.words.length * 4);
        for (let i = 0; i < decryptedBytes.words.length; i++) {
          const word = decryptedBytes.words[i];
          decryptedArray[i * 4 + 0] = (word >> 24) & 0xff;
          decryptedArray[i * 4 + 1] = (word >> 16) & 0xff;
          decryptedArray[i * 4 + 2] = (word >> 8) & 0xff;
          decryptedArray[i * 4 + 3] = word & 0xff;
        }

        // Create a Blob from the decrypted Uint8Array
        const decryptedBlob = new Blob([decryptedArray], {
          type: "image/jpeg",
        });
        const blobUrl = URL.createObjectURL(decryptedBlob);
        resolve(blobUrl);
      } catch (error) {
        reject(error);
      }
    });
  };

  return decryptImage;
};

export default useImageDecryption;
