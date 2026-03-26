const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  const user = new User({ email, password });
  await user.save();

  res.json({ message: "Signup Successful" });
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.json({ message: "Login Success" });
  } else {
    res.json({ message: "Invalid Credentials" });
  }
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});