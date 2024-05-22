// const express = require('express');
// const mongoose = require('mongoose');
// const dataRoutes = require('./routes/dataRoutes');
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 7000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Database connection
// mongoose.connect('mongodb://localhost:27017/mern_app_db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => console.log('Connected to MongoDB'));

// // Routes
// app.use('/', dataRoutes);

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const dataRoutes = require("./routes/dataRoutes");
const cors = require("cors");
const WebSocket = require("ws"); // Import the 'ws' library

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(
  "mongodb+srv://uavid:6RGgZSbpeDMEmGJg@temptest.clhauuh.mongodb.net/?retryWrites=true&w=majority&appName=temptest",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
// db.once('open', () => console.log('Connected to MoongoDB'));
db.once("open", () => {
  console.log("Connected to MoongoDB");
  console.log("Database name:", db.name);
  console.log("Host:", db.host);
});

// Routes
app.use("/", dataRoutes);

// WebSocket setup
const wss = new WebSocket.Server({ port: 8080 }); // Create a WebSocket server

// Event listener for WebSocket connections
wss.on("connection", function connection(ws) {
  console.log("Client connected");

  // Event listener for receiving messages from WebSocket clients
  ws.on("message", function incoming(message) {
    console.log("Received message:", message);
  });

  // Send a message to the WebSocket client
  ws.send("Hello, WebSocket client!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
