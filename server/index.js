const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./src/config/config");
const postsRouter = require("./src/routes/posts");
const connectDB = require("./src/config/config");
const authRoute = require("./src/routes/authRoute");

const app = express();

connectDB();

// Middleware
app.use(cors({}));
app.use(express.json());

// Routes
app.use("/api/posts", postsRouter);
app.use("/api/auth", authRoute);

// Start server
app.listen(5001, () => {
  console.log(`Server is running on port 5001`);
});
