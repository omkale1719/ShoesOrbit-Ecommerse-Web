const express = require("express");
const app = express();
const Mongodb = require("./Database_connection/DatabaseConnection");
const PORT = process.env.PORT || 5000;



// Middleware to parse JSON
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api", require("./Routes/Auth"));

Mongodb();

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Backend is running 🚀");
});
app.get("/hello", (req, res) => {
  res.send("this is new route 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
