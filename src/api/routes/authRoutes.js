const express = require('express');
const { validate } = require('express-validation');
const controller = require('../controllers/authController');
const {
  login,
  register,
  refresh,
  sendPasswordReset,
  passwordReset,
} = require('../validations/authValidation');

const router = express.Router();

/**
 * Params
 *  {String}          email     User's email
 *  {String{6..128}}  password  User's password
 *
 * Success
 *  (Created 201) {String}  token.tokenType     Access Token's type
 *  (Created 201) {String}  token.accessToken   Authorization Token
 *  (Created 201) {String}  token.refreshToken  Token to get a new accessToken after expiration time
 *  (Created 201) {Number}  token.expiresIn     Access Token's expiration time in miliseconds
 *  (Created 201) {String}  token.timezone      The server's Timezone
 *
 *  (Created 201) {String}  user.id         User's id
 *  (Created 201) {String}  user.name       User's name
 *  (Created 201) {String}  user.email      User's email
 *  (Created 201) {String}  user.role       User's role
 *  (Created 201) {Date}    user.createdAt  Timestamp
 *
 * Error
 *  (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 */
router.route('/register').post(validate(register), controller.register);

/**
 * Params
 *  {String}         email     User's email
 *  {String{..128}}  password  User's password
 *
 * Success
 *  {String}  token.tokenType     Access Token's type
 *  {String}  token.accessToken   Authorization Token
 *  {String}  token.refreshToken  Token to get a new accessToken
 *                                                   after expiration time
 *  {Number}  token.expiresIn     Access Token's expiration time
 *                                                   in miliseconds
 *  {String}  user.id             User's id
 *  {String}  user.name           User's name
 *  {String}  user.email          User's email
 *  {String}  user.role           User's role
 *  {Date}    user.createdAt      Timestamp
 *
 * Error
 *  (Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *  (Unauthorized 401)  Unauthorized     Incorrect email or password
 */
router.route('/login').post(validate(login), controller.login);

/**
 * Params
 *  {String}  email         User's email
 *  {String}  refreshToken  Refresh token aquired when user logged in
 *
 * Success
 *  String}  tokenType     Access Token's type
 *  String}  accessToken   Authorization Token
 *  String}  refreshToken  Token to get a new accessToken after expiration time
 *  Number}  expiresIn     Access Token's expiration time in miliseconds
 *
 * Error
 *  Bad Request 400)  ValidationError  Some parameters may contain invalid values
 *  Unauthorized 401)  Unauthorized     Incorrect email or refreshToken
 */
router.route('/refresh-token').post(validate(refresh), controller.refresh);

router
  .route('/send-password-reset')
  .post(validate(sendPasswordReset), controller.sendPasswordReset);

router
  .route('/reset-password')
  .post(validate(passwordReset), controller.resetPassword);

module.exports = router;
