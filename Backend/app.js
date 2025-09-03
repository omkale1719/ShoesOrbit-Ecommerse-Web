const express = require("express");
const app = express();
const Mongodb = require("./Database_connection/DatabaseConnection");
const PORT = process.env.PORT || 5000;



// Middleware to parse JSON
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",                       
    "https://shoesorbit-ecommerse-web-1.onrender.com" 
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
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
