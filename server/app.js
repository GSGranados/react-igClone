const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
//MODELS
const User = require("./models/user");
const Post = require("./models/post");

//MONGO DB CONNECT
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to REACT-MERN Cluster!");
});
mongoose.connection.on("error", (err) => {
  console.log("Error conntecting to DB", err);
});

//ROUTES
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));

//PORT LISTENING
app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
