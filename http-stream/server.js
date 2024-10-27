const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

const app = express();
const port = 3001;

app.use(cors());

// Read the JSON file

app.get("/stream", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  const rawData = fs.readFileSync(path.join(__dirname, "data.json"));
  
  const streamData = JSON.parse(rawData);

  const dataStream = new Readable({
    read() {},
  });

  let index = 0;

  function sendNextChunk() {
    if (index < streamData.length) {
      dataStream.push(`data: ${JSON.stringify(streamData[index])}\n\n`);
      index++;
      setImmediate(sendNextChunk);
    } else {
      dataStream.push("event: close\ndata: Stream ended\n\n");
      dataStream.push(null);
    }
  }

  sendNextChunk();

  dataStream.pipe(res);

  req.on("close", () => {
    dataStream.destroy();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
