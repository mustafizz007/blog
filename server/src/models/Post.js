const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 200,
  },
  content: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: true,
    enum: [
      "programming",
      "design",
      "technology",
      "business",
      "marketing",
      "lifestyle",
      "other",
    ],
  },
  status: {
    type: String,
    required: true,
    enum: ["draft", "published", "scheduled"],
  },
  scheduledAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postSchema);
