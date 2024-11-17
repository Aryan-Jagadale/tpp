import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/record", records);

app.get('/working',async (req,res) => {
  return res.send({
    do:"Try best..!!"
  })
  
})


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
