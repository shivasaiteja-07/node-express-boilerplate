const express = require('express');
const validate = require('../../middlewares/validate');
const newsValidation = require('../../validations/news.validation');
const newsController = require('../../controllers/news.controller');

const router = express.Router();

// Route for creating a news article and getting all news articles
router
  .route('/')
  .post(validate(newsValidation.createNews), newsController.createNews)
  .get(validate(newsValidation.getNews), newsController.getNews);

// Route for getting, updating, and deleting a news article by ID
router
  .route('/:newsId')
  .get(validate(newsValidation.getNewsById), newsController.getNewsById)
  .patch(validate(newsValidation.updateNews), newsController.updateNewsById)
  .delete(validate(newsValidation.deleteNews), newsController.deleteNewsById);

module.exports = router;
