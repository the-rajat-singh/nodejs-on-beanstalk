const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

/* APIs */
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  tasks.push(req.body);
  res.json({ message: "Task added" });
});

app.get("/health", (req, res) => {
  res.send("Backend running fine 🚀");
});

/* Serve React build */
app.use(express.static(path.join(__dirname, "build")));

/* SPA fallback – THIS IS THE KEY FIX */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

