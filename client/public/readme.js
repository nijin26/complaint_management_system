const timestamp = 1624520705000; // Example timestamp

const currentDate = new Date();
const timestampDate = new Date(timestamp);

const timeDifference = currentDate.getTime() - timestampDate.getTime();
const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

console.log(`Number of days passed: ${daysPassed}`);
