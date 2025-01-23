const Joi = require('joi');
const { objectId } = require('./custom.validation');  // Assuming this is a custom validator for ObjectId

// Validation for creating a news article
const createNews = {
  body: Joi.object().keys({
    heading: Joi.string().required(),  // Heading is required and should be a string
    image: Joi.string().uri().required(),  // Image URL is required and should be a valid URI
    publishDate: Joi.date().required(),  // Publish date is required and should be a valid date
    description: Joi.string().required(),  // Description is required and should be a string
  }),
};

// Validation for querying news articles
const getNews = {
  query: Joi.object().keys({
    heading: Joi.string(),  // Optional: You can search by heading
    publishDate: Joi.date(),  // Optional: You can filter by publish date
    sortBy: Joi.string(),  // Optional: Sorting option (e.g., 'createdAt:asc')
    limit: Joi.number().integer(),  // Optional: Limit the number of results (integer)
    page: Joi.number().integer(),  // Optional: Paginate by page number (integer)
  }),
};

// Validation for getting a single news article by its ID
const getNewsById = {
  params: Joi.object().keys({
    newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
  }),
};

// Validation for updating a news article by its ID
const updateNews = {
  params: Joi.object().keys({
    newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
  }),
  body: Joi.object().keys({
    heading: Joi.string(),  // Optional: Update heading (string)
    image: Joi.string().uri(),  // Optional: Update image URL (valid URI)
    publishDate: Joi.date(),  // Optional: Update publish date (valid date)
    description: Joi.string(),  // Optional: Update description (string)
  }).min(1),  // Ensure at least one field is provided for update
};

// Validation for deleting a news article by its ID
const deleteNews = {
  params: Joi.object().keys({
    newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
  }),
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
};
