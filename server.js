const express = require("express");
const path = require("path");
const cors = require("cors"); // Require the cors module

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
