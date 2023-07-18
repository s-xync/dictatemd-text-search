const express = require("express");
const router = express.Router();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      description: "Documentation for my API",
      version: "1.0.0",
    },
    components: {
      schemas: {
        BlogPost: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the blog post",
            },
            text: {
              type: "string",
              description: "The full content of the blog post",
            },
            author: {
              type: "string",
              format: "string",
              description: "The author of the blog post",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "The publication date and time of the blog post",
            },
          },
        },
      },
    },
  },
  apis: ["./routes/blogposts.js"], // Path to your routes file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve the Swagger API documentation
router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpec));

module.exports = router;
