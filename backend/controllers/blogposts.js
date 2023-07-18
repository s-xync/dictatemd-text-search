const BlogPost = require("../models/BlogPost");

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add a blog post
const addBlogPost = async (req, res) => {
  try {
    const { title, text, author } = req.body;
    const newBlogPost = new BlogPost({ title, text, author });
    await newBlogPost.save();
    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Search blog posts by keywords
const searchBlogPosts = async (req, res) => {
  try {
    const { keywords } = req.query;
    const searchKeywords = keywords
      .split(" ")
      .map((keyword) => new RegExp(keyword, "i"));
    const blogPosts = await BlogPost.find({
      $or: [
        { title: { $in: searchKeywords } },
        { text: { $in: searchKeywords } },
      ],
    });
    res.json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getAllBlogPosts,
  addBlogPost,
  searchBlogPosts,
};
