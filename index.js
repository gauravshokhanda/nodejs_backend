const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const timeTrackerRoutes = require("./routes/timeTrackerRoutes");
const calculationRoutes = require("./routes/calculationRoutes");
const twoDImageRoutes = require("./routes/twoDimageRoutes");
const getUsersRoutes = require("./routes/getUsersRoutes.js")


// Initialize Express
const app = express();
dotenv.config();

// Middleware
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve video files statically

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/videos", videoRoutes); // Video routes
app.use("/api/timetracker", timeTrackerRoutes); // Time tracker routes
app.use("/api/calculations", calculationRoutes);
app.use("/api/2d-images", twoDImageRoutes);
app.use("/api/getUsers", getUsersRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
