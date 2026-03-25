const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= CLOUDINARY =================
cloudinary.config({
  cloud_name: "difdav05y",
  api_key: "442464391541895",
  api_secret: "VR-Iiv-Jg1Daln0Bbw3Ofau3bC4",
});

// ================= MULTER =================
const upload = multer({ dest: "uploads/" });

// ================= MONGODB =================
mongoose.connect("mongodb://127.0.0.1:27017/blogApp")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("Mongo Error:", err));

// ================= SCHEMA =================
const blogSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    image: String,
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

// ================= ROUTES =================

// 🔥 CREATE BLOG
app.post("/api/blogs", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { title, content } = req.body;

    if (!title || !content || !req.file) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    fs.unlinkSync(req.file.path);

    const newBlog = new Blog({
      title,
      content,
      image: result.secure_url,
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully ✅",
      blog: newBlog,
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      message: "Server error ❌",
      error: error.message,
    });
  }
});

// 🔥 GET ALL BLOGS
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// 🔥 GET SINGLE BLOG
app.get("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// 🔥 UPDATE BLOG
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

// 🔥 DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully ✅" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

// ================= SERVER =================
app.listen(5000, () => {
  console.log("Server running 🚀 on port 5000");
});