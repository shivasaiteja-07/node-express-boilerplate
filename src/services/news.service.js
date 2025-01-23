const News = require('../models/news.model');
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Create a news article
 * @param {Object} newsBody
 * @returns {Promise<News>}
 */
const createNews = async (newsBody) => {
  const news = await News.create(newsBody);
  return news;
};

/**
 * Get all news articles with pagination and filtering
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<QueryResult>}
 */
const getNews = async (filter, options) => {
  const news = await News.paginate(filter, options);
  return news;
};

/**
 * Get news article by ID
 * @param {ObjectId} newsId
 * @returns {Promise<News>}
 */
const getNewsById = async (newsId) => {
  const news = await News.findById(newsId);
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
  }
  return news;
};

/**
 * Update news article by ID
 * @param {ObjectId} newsId
 * @param {Object} updateBody
 * @returns {Promise<News>}
 */
const updateNewsById = async (newsId, updateBody) => {
  const news = await getNewsById(newsId);
  Object.assign(news, updateBody);
  await news.save();
  return news;
};

/**
 * Delete news article by ID
 * @param {ObjectId} newsId
 * @returns {Promise<News>}
 */
const deleteNewsById = async (newsId) => {
  const news = await getNewsById(newsId);
  await news.remove();
  return news;
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};
