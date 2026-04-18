const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

// ================= DB =================
mongoose
  .connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ================= USER =================
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

// Signup
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.json({ message: "User already exists ❌" });
    }

    const user = new User({ email, password });
    await user.save();

    res.json({ message: "Signup Successful ✅" });
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ message: "Login Success ✅" });
    } else {
      res.json({ message: "Invalid Credentials ❌" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error ❌" });
  }
});

// ================= MULTER =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ================= BLOG =================
const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
});

const Blog = mongoose.model("Blog", BlogSchema);

// CREATE
app.post("/create-blog", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? req.file.filename : "";

    const blog = new Blog({ title, content, image });
    await blog.save();

    res.json({ message: "Blog Created ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// GET ALL
app.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 });
  res.json(blogs);
});

// GET SINGLE ✅ (IMPORTANT FIX)
app.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// UPDATE ✅ (IMPORTANT FIX)
app.put("/update-blog/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    res.json({ message: "Blog Updated ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error ❌" });
  }
});

// DELETE
app.delete("/delete-blog/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: "Blog Deleted 🗑️" });
});

// STATIC
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => console.log("Server running on port 5000 🚀"));