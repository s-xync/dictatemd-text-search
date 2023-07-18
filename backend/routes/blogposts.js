const express = require("express");
const router = express.Router();
const blogPostController = require("../controllers/blogposts");

// Get all blog posts
/**
 * @swagger
 * /blogposts:
 *   get:
 *     summary: Get all blog posts
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 */
router.get("/", blogPostController.getAllBlogPosts);

// Add a blog post
/**
 * @swagger
 * /blogposts:
 *   post:
 *     summary: Add a blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               text:
 *                 type: string
 *               author:
 *                 type: string
 *             required:
 *               - title
 *               - text
 *               - author
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BlogPost'
 */
router.post("/", blogPostController.addBlogPost);

// Search blog posts by keywords
/**
 * @swagger
 * /blogposts/search:
 *   get:
 *     summary: Search blog posts by keywords
 *     parameters:
 *       - in: query
 *         name: keywords
 *         schema:
 *           type: string
 *         required: true
 *         description: Keywords to search blog posts
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BlogPost'
 */
router.get("/search", blogPostController.searchBlogPosts);

module.exports = router;
