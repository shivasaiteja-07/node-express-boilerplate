const express = require('express');
const validate = require('../../middlewares/validate');
const newsValidation = require('../../validations/news.validation');
const newsController = require('../../controllers/news.controller');

// src/routes/v1/news.route.js




const router = express.Router();

// Route for creating and fetching all news articles
router
  .route('/')
  .post( validate(newsValidation.createNews), newsController.createNews)

  .get(validate(newsValidation.getNews), newsController.getNews);

router
  .route('/title/:title')
  .get(newsController.getNewsByTitle); 
router
  .route('/all')
  .get(newsController.getAllNews); 

router
  .route('/deleteTitle/:title')
  .delete(newsController.deleteNewsByTitle);

// Route for fetching, updating, and deleting a specific news article by ID
router
  .route('/:newsId')
  .get(validate(newsValidation.getNewsById), newsController.getNewsById)
  .patch( validate(newsValidation.updateNews), newsController.updateNews)
  .delete(validate(newsValidation.deleteNews), newsController.deleteNews);

module.exports = router;

// // const router = express.Router();

// // // Route for creating a news article and getting all news articles
// // router
// //   .route('/')
// //   .post(validate(newsValidation.createNews), newsController.createNews)
// //   .get(validate(newsValidation.getNews), newsController.getNews);

// // // Route for getting, updating, and deleting a news article by ID
// // router
// //   .route('/:newsId')
// //   .get(validate(newsValidation.getNewsById), newsController.getNewsById)
// //   .patch(validate(newsValidation.updateNews), newsController.updateNewsById)
// //   .delete(validate(newsValidation.deleteNews), newsController.deleteNewsById);

// // module.exports = router;
