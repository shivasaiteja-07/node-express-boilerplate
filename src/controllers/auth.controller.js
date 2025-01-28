

const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, newsService } = require('../services');

// Existing functions...

// Add the news-related functions here

// Create a news article
const createNews = catchAsync(async (req, res) => {
  const { heading, content, author, publishDate } = req.body;  // Assuming these fields for the news article
  const newsData = { heading, content, author, publishDate };

  // Create the news article
  const news = await newsService.createNews(newsData);

  res.status(httpStatus.CREATED).send(news);
});

// Get all news articles
const getNews = catchAsync(async (req, res) => {
  const news = await newsService.getNews();
  res.status(httpStatus.OK).send(news);
});

// Get a single news article by ID
const getNewsById = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const news = await newsService.getNewsById(newsId);

  if (!news) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'News article not found' });
  } else {
    res.status(httpStatus.OK).send(news);
  }
});

// Update a news article by ID
const updateNewsById = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const updatedNews = await newsService.updateNewsById(newsId, req.body);

  if (!updatedNews) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'News article not found' });
  } else {
    res.status(httpStatus.OK).send(updatedNews);
  }
});

// Delete a news article by ID
const deleteNewsById = catchAsync(async (req, res) => {
  const { newsId } = req.params;
  const deletedNews = await newsService.deleteNewsById(newsId);

  if (!deletedNews) {
    res.status(httpStatus.NOT_FOUND).send({ message: 'News article not found' });
  } else {
    res.status(httpStatus.NO_CONTENT).send();
  }
});

module.exports = {
  // Existing exports...
  createNews,
  getNews,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};


const register = catchAsync(async (req, res) => {
  // const user = await userService.createUser(req.body);
  // const tokens = await tokenService.generateAuthTokens(user);
  // res.status(httpStatus.CREATED).send({ user, tokens });
  const { email, password, name, phoneNumber,dateOfBirth } = req.body;  // Add phoneNumber to the body
  const userData = { email, password, name, phone: phoneNumber,dateOfBirth };  // Include phone in the user data
  
  // Create the user
  const user = await userService.createUser(userData);
  
  // Generate auth tokens for the user
  const tokens = await tokenService.generateAuthTokens(user);

  // Send the response with the user and tokens
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
