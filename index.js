const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
require("dotenv").config();

const port = process.env.NODE_LOCAL_PORT || 8080;

app.use(cors({ origin: process.env.URL_CLIENT }));
app.use(express.json());

app.post("/sendform", async (req, res) => {
  const { phoneNumber, campaignId, priorityGroupId, nombre, aux1, aux3, aux9 } =
    req.body;
  let number = parseInt(phoneNumber, 10);
  console.log(number);
  let url =
    process.env.URL_RUMBAO +
    `/api.php?c=1&k=91c8kIKF1SPkcxW3mgqDb3NQ&a=addCampaignPhone&phoneNumber=${number}&campaignId=${campaignId}&priorityGroupId=${priorityGroupId}&nombre=${nombre}&ca=1&aux1=${aux1}&aux3=${aux3}&aux9=${aux9} `;
  console.log(url);
  try {
    const response = await axios.get(url);
    console.log(response.data);
    res.json({ message: "formulario enviado con exito" });
  } catch (error) {
    console.log("Error: " + error.message);
  }
});
app.get("/", (req, res) => {
  res.send("Hello World I am running locally");
});

app.listen(port, () => {
  console.log(`server on port ${port}`);
});
