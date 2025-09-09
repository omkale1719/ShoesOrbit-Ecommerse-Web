const express = require("express");
const app = express();
const Mongodb = require("./Database_connection/DatabaseConnection");
const PORT = process.env.PORT || 5000;
const cors = require("cors");

app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                       
    "https://shoesorbitweb.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use("/api", require("./Routes/Auth"));

Mongodb();
app.get("/", (req, res) => {
  res.send("Hello, Backend is running 🚀");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
