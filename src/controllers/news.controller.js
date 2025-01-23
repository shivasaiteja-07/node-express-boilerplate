const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { newsService } = require('../services');  // Use the news service instead of the user service

// Create a news article
const createNews = catchAsync(async (req, res) => {
  const news = await newsService.createNews(req.body);
  res.status(httpStatus.CREATED).send(news);
});

// Get all news articles
const getNews = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['heading', 'publishDate']);  // Filtering by heading and publish date
  const options = pick(req.query, ['sortBy', 'limit', 'page']);  // Options for sorting, limiting, and pagination
  const result = await newsService.queryNews(filter, options);
  res.send(result);
});

// Get a single news article by ID
const getNewsById = catchAsync(async (req, res) => {
  const news = await newsService.getNewsById(req.params.newsId);
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
  }
  res.send(news);
});

// Update a news article by ID
const updateNewsById = catchAsync(async (req, res) => {
  const news = await newsService.updateNewsById(req.params.newsId, req.body);
  res.send(news);
});

// Delete a news article by ID
const deleteNewsById = catchAsync(async (req, res) => {
  await newsService.deleteNewsById(req.params.newsId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};
