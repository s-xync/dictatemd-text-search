const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogposts");

// Get all blog posts
router.get("/", blogPostController.getAllBlogPosts);

// Add a blog post
router.post("/", blogPostController.addBlogPost);

// Search blog posts by keywords
router.get("/search", blogPostController.searchBlogPosts);

module.exports = router;
