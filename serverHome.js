const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let listings = [];
let requests = [];

// Login Endpoint (dummy auth)
app.post("/api/login", (req, res) => {
  const { studentId } = req.body;
  if (studentId && studentId.length >= 5) {
    return res.status(200).json({ success: true, message: "Login successful!" });
  } else {
    return res.status(400).json({ success: false, message: "Invalid Student ID" });
  }
});

// Add item listing
app.post("/api/listings", (req, res) => {
  const { itemName, category } = req.body;
  if (!itemName || !category) {
    return res.status(400).json({ message: "Missing fields" });
  }
  listings.push({ itemName, category, id: Date.now() });
  res.status(201).json({ message: "Item added", listings });
});

// Get all listings
app.get("/api/listings", (req, res) => {
  res.json(listings);
});

// Submit a request
app.post("/api/requests", (req, res) => {
  const { requestText } = req.body;
  if (!requestText) {
    return res.status(400).json({ message: "Missing request text" });
  }
  requests.push({ requestText, id: Date.now() });
  res.status(201).json({ message: "Request submitted", requests });
});

// Get all requests
app.get("/api/requests", (req, res) => {
  res.json(requests);
});

app.listen(PORT, () => {
  console.log(`Dorm Exchange backend running at http://localhost:${PORT}`);
});
