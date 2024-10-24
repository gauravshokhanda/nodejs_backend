const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");
const timeTrackerRoutes = require("./routes/timeTrackerRoutes");
const calculationRoutes = require("./routes/calculationRoutes");
const fs = require("fs");

// Initialize Express
const app = express();
dotenv.config();

// Middleware
const corsOptions = {
  origin: "*", // Replace with your frontend domain
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

// Read SSL certificate files
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/your_domain/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/your_domain/fullchain.pem",
  "utf8"
);

const credentials = { key: privateKey, cert: certificate };

// Start server
const PORT = process.env.PORT || 5000;
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
