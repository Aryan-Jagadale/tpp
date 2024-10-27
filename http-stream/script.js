const fs = require('fs');
const path = require('path');

// Function to generate random stream data
function generateStreamData(startTime, numEntries) {
  const streamData = [];
  for (let i = 0; i < numEntries; i++) {
    const timestamp = new Date(startTime.getTime() + i * 3600000).toISOString(); 
    const value = (Math.random() * (50.0 - 40.0) + 40.0).toFixed(1); // Random value between 40.0 and 50.0
    streamData.push({
      timestamp: timestamp,
      value: parseFloat(value),
    });
  }
  return streamData;
}

// Generate 1000 data points starting from the current time
const startTime = new Date("2024-10-09T00:00:00Z");
const numEntries = 1000;

const data = generateStreamData(startTime, numEntries);

// Write the data to a JSON file
const filePath = path.join(__dirname, 'streamData.json');
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log(`Data successfully written to ${filePath}`);
