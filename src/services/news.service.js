
const News = require('../models/news.model');
const ApiError = require('../utils/ApiError');
 const httpStatus = require('http-status');


const createNews = async (newsBody) => {
  const news = await News.create(newsBody);
  return news;
};

// // Get all news articles
// const getNews = async (filter, options) => {
//   return await News.paginate(filter, options);
// };
const getNews = async (filter, options) => {
  const { page, limit } = options;

  // Use the paginate method on the News model to get paginated results
  const news = await News.paginate(filter, { page, limit });

  return news;
};

const getNewsByTitle = async (title) => {
  const news = await News.findOne({ title: { $regex: title, $options: 'i' } });  // Case-insensitive search
  return news;
};
// Get a single news article by ID
const getNewsById = async (newsId) => {
  const news = await News.findById(newsId);
  if (!news) {
    throw new Error('News article not found');
  }
  return news;
};

// Update a news article by ID
const updateNews = async (newsId, updateBody) => {
  const news = await getNewsById(newsId);
  Object.assign(news, updateBody);
  await news.save();
  return news;
};

// Delete a news article by ID
const deleteNews = async (newsId) => {
  const news = await getNewsById(newsId);
  await news.remove();
  return news;
};
// Get all news articles
const getAllNews = async () => {
  const news = await News.find();  // Fetch all news articles from the database
  return news;
};

// Delete a news article by title
const deleteNewsByTitle = async (title) => {
  const news = await News.findOneAndDelete({ title: { $regex: title, $options: 'i' } });  // Case-insensitive search
  return news;  // Return the deleted news article or null if not found
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  getAllNews,
  deleteNews,
  getNewsByTitle,
  deleteNewsByTitle,
};



// const News = require('../models/news.model');
// const ApiError = require('../utils/ApiError');
//  const httpStatus = require('http-status');

// /**
//  * Create a news article
//  * @param {Object} newsBody
//  * @returns {Promise<News>}
//  */
// const createNews = async (newsBody) => {
//   const news = await News.create(newsBody);
//   return news;
// };

// /**
//  * Get all news articles with pagination and filtering
//  * @param {Object} filter
//  * @param {Object} options
//  * @returns {Promise<QueryResult>}
//  */
// const getNews = async (filter, options) => {
//   const news = await News.paginate(filter, options);
//   return news;
// };

// /**
//  * Get news article by ID
//  * @param {ObjectId} newsId
//  * @returns {Promise<News>}
//  */
// const getNewsById = async (newsId) => {
//   const news = await News.findById(newsId);
//   if (!news) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
//   }
//   return news;
// };

// /**
//  * Update news article by ID
//  * @param {ObjectId} newsId
//  * @param {Object} updateBody
//  * @returns {Promise<News>}
//  */
// const updateNewsById = async (newsId, updateBody) => {
//   const news = await getNewsById(newsId);
//   Object.assign(news, updateBody);
//   await news.save();
//   return news;
// };

// /**
//  * Delete news article by ID
//  * @param {ObjectId} newsId
//  * @returns {Promise<News>}
//  */
// const deleteNewsById = async (newsId) => {
//   const news = await getNewsById(newsId);
//   await news.remove();
//   return news;
// };

// module.exports = {
//   createNews,
//   getNews,
//   getNewsById,
//   updateNewsById,
//   deleteNewsById,
// };
