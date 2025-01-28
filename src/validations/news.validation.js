const Joi = require('joi');
const { objectId } = require('./custom.validation');  // Assuming this is a custom validator for ObjectId



const createNews = {
  body: Joi.object().keys({
    title: Joi.string().required().trim().min(3).max(100).messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be less than or equal to 100 characters',
    }),
    content: Joi.string().required().min(10).messages({
      'string.base': 'Content must be a string',
      'string.empty': 'Content cannot be empty',
      'any.required': 'Content is required',
      'string.min': 'Content must be at least 10 characters long',
    }),
    author: Joi.string().required().trim().min(3).messages({
      'string.base': 'Author must be a string',
      'string.empty': 'Author cannot be empty',
      'any.required': 'Author is required',
      'string.min': 'Author must be at least 3 characters long',
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Tags should be an array of strings',
    }),
    imageUrl: Joi.string().uri().optional().messages({
      'string.base': 'Image URL must be a string',
      'string.uri': 'Image URL must be a valid URL',
    }),
    isPublished: Joi.boolean().default(true).messages({
      'boolean.base': 'isPublished should be a boolean',
    }),
    category: Joi.string().valid('sports', 'politics', 'technology', 'entertainment', 'business').optional().messages({
      'string.base': 'Category must be a string',
      'any.only': 'Category must be one of the following: sports, politics, technology, entertainment, business',
    }),
  }),
};

const getNews = {
  query: Joi.object().keys({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'Page should be a number',
      'number.integer': 'Page should be an integer',
    }),
    limit: Joi.number().integer().min(1).default(10).messages({
      'number.base': 'Limit should be a number',
      'number.integer': 'Limit should be an integer',
    }),
    sortBy: Joi.string().optional().messages({
      'string.base': 'SortBy should be a string',
    }),
  }),
};

const getNewsById = {
  params: Joi.object().keys({
    newsId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'newsId should be a valid ObjectId',
      'any.required': 'newsId is required',
      'string.length': 'newsId must be 24 characters long',
    }),
  }),
};

const updateNewsById = {
  params: Joi.object().keys({
    newsId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'newsId should be a valid ObjectId',
      'any.required': 'newsId is required',
      'string.length': 'newsId must be 24 characters long',
    }),
  }),
  body: Joi.object().keys({
    title: Joi.string().trim().min(3).max(100).optional().messages({
      'string.base': 'Title must be a string',
      'string.empty': 'Title cannot be empty',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title must be less than or equal to 100 characters',
    }),
    content: Joi.string().min(10).optional().messages({
      'string.base': 'Content must be a string',
      'string.empty': 'Content cannot be empty',
      'string.min': 'Content must be at least 10 characters long',
    }),
    author: Joi.string().trim().min(3).optional().messages({
      'string.base': 'Author must be a string',
      'string.empty': 'Author cannot be empty',
      'string.min': 'Author must be at least 3 characters long',
    }),
    tags: Joi.array().items(Joi.string()).optional().messages({
      'array.base': 'Tags should be an array of strings',
    }),
    imageUrl: Joi.string().uri().optional().messages({
      'string.uri': 'Image URL must be a valid URL',
    }),
    isPublished: Joi.boolean().optional().messages({
      'boolean.base': 'isPublished should be a boolean',
    }),
    category: Joi.string().valid('sports', 'politics', 'technology', 'entertainment', 'business').optional().messages({
      'string.base': 'Category must be a string',
      'any.only': 'Category must be one of the following: sports, politics, technology, entertainment, business',
    }),
  }).min(1),  // At least one field should be updated
};

const deleteNews = {
  params: Joi.object().keys({
    newsId: Joi.string().hex().length(24).required().messages({
      'string.hex': 'newsId should be a valid ObjectId',
      'any.required': 'newsId is required',
      'string.length': 'newsId must be 24 characters long',
    }),
  }),
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNews,
};

//
// // Validation for creating a news article
// const createNews = {
//   body: Joi.object().keys({
//     heading: Joi.string().required(),  // Heading is required and should be a string
//     image: Joi.string().uri().required(),  // Image URL is required and should be a valid URI
//     publishDate: Joi.date().required(),  // Publish date is required and should be a valid date
//     description: Joi.string().required(),  // Description is required and should be a string
//   }),
// };

// // Validation for querying news articles
// const getNews = {
//   query: Joi.object().keys({
//     heading: Joi.string(),  // Optional: You can search by heading
//     publishDate: Joi.date(),  // Optional: You can filter by publish date
//     sortBy: Joi.string(),  // Optional: Sorting option (e.g., 'createdAt:asc')
//     limit: Joi.number().integer(),  // Optional: Limit the number of results (integer)
//     page: Joi.number().integer(),  // Optional: Paginate by page number (integer)
//   }),
// };

// // Validation for getting a single news article by its ID
// const getNewsById = {
//   params: Joi.object().keys({
//     newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
//   }),
// };

// // Validation for updating a news article by its ID
// const updateNews = {
//   params: Joi.object().keys({
//     newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
//   }),
//   body: Joi.object().keys({
//     heading: Joi.string(),  // Optional: Update heading (string)
//     image: Joi.string().uri(),  // Optional: Update image URL (valid URI)
//     publishDate: Joi.date(),  // Optional: Update publish date (valid date)
//     description: Joi.string(),  // Optional: Update description (string)
//   }).min(1),  // Ensure at least one field is provided for update
// };

// // Validation for deleting a news article by its ID
// const deleteNews = {
//   params: Joi.object().keys({
//     newsId: Joi.string().custom(objectId).required(),  // News ID must be a valid ObjectId
//   }),
// };

// module.exports = {
//   createNews,
//   getNews,
//   getNewsById,
//   updateNews,
//   deleteNews,
// };
