const mongoose = require('mongoose');

const newsSchema = mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const News = mongoose.model('News', newsSchema);

module.exports = News;
