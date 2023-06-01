// * <<<<<<<< Function to Decrypt Image >>>>>>>>>>

function decryptImage(encryptedImageData) {
  //  Convert the encrypted image string to WordArray
  const encrypted = CryptoJS.enc.Hex.parse(encryptedImageData);

  // Perform decryption using AES
  const secretKey = "YourSecretKey";
  const decrypted = CryptoJS.AES.decrypt({ ciphertext: encrypted }, secretKey);

  // Get the decrypted WordArray
  const decryptedWordArray = CryptoJS.lib.WordArray.create(decrypted.words);

  // Convert the WordArray back to ArrayBuffer
  const decryptedArrayBuffer = decryptedWordArray.toArrayBuffer();

  // Use the decrypted image data as needed
  console.log("Decrypted Image Data:", decryptedArrayBuffer);
}

const encryptedImageString = "U2FsdGVkX1..."; // Replace with your encrypted image string
decryptImage(encryptedImageString);

// * <<<<<<<< ENCRYPTED DATA FETCHING >>>>>>>>>

const encryptedDataFetched = await storage.downloadJSON(
  "ipfs://QmTCNUzdnZGBXeqwDhRxhcBauSU5WVGcvBMPYq2J1xFS37/0"
);
const decryptedBytes = CryptoJS.AES.decrypt(
  encryptedDataFetched,
  process.env.NEXT_PUBLIC_SECRET_KEY
);
const decryptedData = JSON.parse(decryptedBytes.toString(CryptoJS.enc.Utf8));
