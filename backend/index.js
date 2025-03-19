const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "POST",
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function getZoomToken() {
  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      {
        grant_type: "account_credentials",
        account_id: "IOvkNmItRrmS9BUu3l8W7Q",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic SER2U2pUVnFTWWVRR1RmOURtUUllZzpOTDFBTHdXMUtSdEFtY1p2TWNnMmdBVUcxQndmTGFJQw==",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

app.post("/", async (req, res) => {
  const zoomToken = await getZoomToken();
  try {
    console.log(req.body);
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: req.body.topic,
        type: 2,
        start_time: "2025-09-20T11:00:00",
        duration: 60,
        timezone: "Europe/Paris",
      },
      {
        headers: {
          Authorization: `Bearer ${zoomToken}`,
        },
      }
    );
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
