const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// 1️⃣ Connect to MongoDB
connectDB();

// 2️⃣ Middlewares
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

// 3️⃣ Health check route (for debugging)
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Backend is running" });
});

// 4️⃣ API routes
app.use("/api", require("./routes/contactRoutes"));

// 5️⃣ Fallback route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 6️⃣ Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
