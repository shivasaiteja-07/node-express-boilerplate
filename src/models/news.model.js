const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2'); 

const newsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,  // Ensures no two news articles have the same title
      trim: true,    // Trims whitespace from the title
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    tags: {
      type: [String],  // Array of tags related to the news
    },
    imageUrl: {
      type: String,  // Optional field to store an image URL for the article
    },
    isPublished: {
      type: Boolean,
      default: true,  // Whether the news article is publicly visible
    },
    category: {
      type: String,  // Optional: Category of news (e.g., sports, politics, etc.)
      enum: ['sports', 'politics', 'technology', 'entertainment', 'business'],  // Set allowed categories
    },
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

const News = mongoose.model('News', newsSchema);
newsSchema.plugin(mongoosePaginate);

module.exports = News;
