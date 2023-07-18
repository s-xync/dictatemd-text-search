const redis = require("redis");

const BlogPost = require("../models/BlogPost");

let redisClient;

(async () => {
  redisClient = redis.createClient();
  redisClient.on("error", (error) => console.error(`Error : ${error}`));
  await redisClient.connect();
})();

// Get all blog posts
const getAllBlogPosts = async (req, res) => {
  try {
    const cacheKey = "blogPosts";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      res.json(JSON.parse(cachedData));
    } else {
      const blogPosts = await BlogPost.find();
      redisClient.set(cacheKey, JSON.stringify(blogPosts), "EX", 3600);
      res.json(blogPosts);
    }
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

    // Invalidate cache for getAllBlogPosts
    redisClient.del("blogPosts");

    // Invalidate all search caches
    const keys = await redisClient.keys("search:*");
    if (keys.length > 0) {
      redisClient.del(keys);
    }

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
    const cacheKey = `search:${keywords.toLowerCase()}`; // Convert keywords to lowercase for cache key
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      res.json(JSON.parse(cachedData));
    } else {
      const searchKeywords = keywords
        .toLowerCase() // Convert keywords to lowercase for search
        .split(" ")
        .map((keyword) => new RegExp(keyword, "i"));
      const blogPosts = await BlogPost.find({
        $or: [
          { title: { $in: searchKeywords } },
          { text: { $in: searchKeywords } },
        ],
      });

      redisClient.set(cacheKey, JSON.stringify(blogPosts), "EX", 3600);
      res.json(blogPosts);
    }
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
