const httpStatus = require('http-status');
const { newsService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');

// Create a news article
const createNews = catchAsync(async (req, res) => {
  const news = await newsService.createNews(req.body);
  res.status(httpStatus.CREATED).send(news);
});

// Get all news articles
// const getNews = catchAsync(async (req, res) => {
//   const filter = req.query; // Extract filters from query parameters
//   const options = { 
//     page: parseInt(req.query.page, 10) || 1, 
//     limit: parseInt(req.query.limit, 10) || 10 
//   };
  
//   const news = await newsService.getNews(filter, options);
//   res.status(httpStatus.OK).send(news);
// });
const getNews = catchAsync(async (req, res) => {
  const filter = {};

  // Check if a 'title' query parameter is provided
  if (req.query.title) {
    filter.title = { $regex: req.query.title, $options: 'i' };  // Case-insensitive search
  }

  const options = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 10
  };

  const news = await newsService.getNews(filter, options);
  res.status(httpStatus.OK).send(news);
});

//get title 
const getNewsByTitle = async (req, res) => {
  try {
    const { title } = req.params;  // Get the title from URL parameters
    const news = await newsService.getNewsByTitle(title);  // Call service to search by title
    if (!news) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'News article not found' });
    }
    res.status(httpStatus.OK).send(news);  // Return the news article found
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};
// Get a news article by ID
const getNewsById = catchAsync(async (req, res) => {
  const news = await newsService.getNewsById(req.params.newsId);
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
  }
  res.status(httpStatus.OK).send(news);
});

// Get all news articles
const getAllNews = async (req, res) => {
  try {
    const news = await newsService.getAllNews();  // Call service to get all news
    res.status(httpStatus.OK).send(news);  // Return all news articles
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

// Update a news article
const updateNews = catchAsync(async (req, res) => {
  const news = await newsService.updateNews(req.params.newsId, req.body);
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
  }
  res.status(httpStatus.OK).send(news);
});

// Delete a news article
const deleteNews = catchAsync(async (req, res) => {
  await newsService.deleteNews(req.params.newsId);
  res.status(httpStatus.NO_CONTENT).send();
});

// Delete a news article by title
const deleteNewsByTitle = async (req, res) => {
  try {
    const { title } = req.params;  // Get the title from the URL parameters
    const deletedNews = await newsService.deleteNewsByTitle(title);  // Call service to delete by title

    if (!deletedNews) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'News article not found' });
    }

    res.status(httpStatus.NO_CONTENT).send();  // Return 204 No Content if deletion is successful
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

module.exports = {
  createNews,
  getNews,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByTitle,
  getAllNews,
  deleteNewsByTitle,
};


// // Create a news article
// const createNews = catchAsync(async (req, res) => {
//   const news = await newsService.createNews(req.body);
//   res.status(httpStatus.CREATED).send(news);
// });

// // Get all news articles
// const getNews = catchAsync(async (req, res) => {
//   const filter = pick(req.query, ['heading', 'publishDate']);  // Filtering by heading and publish date
//   const options = pick(req.query, ['sortBy', 'limit', 'page']);  // Options for sorting, limiting, and pagination
//   const result = await newsService.queryNews(filter, options);
//   res.send(result);
// });

// // Get a single news article by ID
// const getNewsById = catchAsync(async (req, res) => {
//   const news = await newsService.getNewsById(req.params.newsId);
//   if (!news) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'News article not found');
//   }
//   res.send(news);
// });

// // Update a news article by ID
// const updateNewsById = catchAsync(async (req, res) => {
//   const news = await newsService.updateNewsById(req.params.newsId, req.body);
//   res.send(news);
// });

// // Delete a news article by ID
// const deleteNewsById = catchAsync(async (req, res) => {
//   await newsService.deleteNewsById(req.params.newsId);
//   res.status(httpStatus.NO_CONTENT).send();
// });

// module.exports = {
//   createNews,
//   getNews,
//   getNewsById,
//   updateNewsById,
//   deleteNewsById,
// };
