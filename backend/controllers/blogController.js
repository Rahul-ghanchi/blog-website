const Blog = require("../models/blog");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content required",
      });
    }

    const blog = await Blog.create({ title, content });

    res.status(201).json({
      success: true,
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json({
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};