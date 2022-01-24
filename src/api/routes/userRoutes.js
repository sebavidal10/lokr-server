const express = require('express');
const { validate } = require('express-validation');
const controller = require('../controllers/userController');
const { authorize, ADMIN, LOGGED_USER } = require('../middlewares/auth');
const {
  listUsers,
  createUser,
  replaceUser,
  updateUser,
} = require('../validations/userValidation');

const router = express.Router();

router.param('userId', controller.load);

router
  .route('/')
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Params:
   *  {Number{1-}}         [page=1]     List page
   *  {Number{1-100}}      [perPage=1]  Users per page
   *  {String}             [email]      User's email
   *  {String=user,admin}  [role]       User's role (not mandatory)
   *
   * Success
   *  {Object[]} users List of users.
   *
   * Error
   *  (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   *  (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(ADMIN), validate(listUsers), controller.list)
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Params:
   *  {String}             email     User's email
   *  {String{6..128}}     password  User's password
   *
   * Success
   *  (Created 201) {String}  id         User's id
   *  (Created 201) {String}  email      User's email
   *  (Created 201) {String}  role       User's role
   *  (Created 201) {Date}    createdAt  Timestamp
   *
   * Error
   *  (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   *  (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   *  (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createUser), controller.create);

router
  .route('/profile')
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Success
   *  {String}  id         User's id
   *  {String}  email      User's email
   *  {String}  role       User's role
   *  {Date}    createdAt  Timestamp
   *
   * Error
   *  (Unauthorized 401)  Unauthorized  Only authenticated Users can access the data
   */
  .get(authorize(), controller.loggedIn);

router
  .route('/:userId')
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Success
   *  {String}  id         User's id
   *  {String}  email      User's email
   *  {String}  role       User's role
   *  {Date}    createdAt  Timestamp
   *
   * Error
   *  (Unauthorized 401) Unauthorized Only authenticated users can access the data
   *  (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   *  (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Params
   *  {String}             email     User's email
   *  {String{6..128}}     password  User's password
   *  {String=user,admin}  [role]    User's role
   * (You must be an admin to change the user's role)
   *
   * Success
   *  {String}  id         User's id
   *  {String}  email      User's email
   *  {String}  role       User's role
   *  {Date}    createdAt  Timestamp
   *
   * Error
   *  (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   *  (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   *  (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   *  (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(LOGGED_USER), validate(replaceUser), controller.replace)
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Params
   *  {String}             email     User's email
   *  {String{6..128}}     password  User's password
   *  {String=user,admin}  [role]    User's role
   * (You must be an admin to change the user's role)
   *
   * Success
   *  {String}  id         User's id
   *  {String}  email      User's email
   *  {String}  role       User's role
   *  {Date}    createdAt  Timestamp
   *
   * Error
   *  (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   *  (Unauthorized 401) Unauthorized Only authenticated users can modify the data
   *  (Forbidden 403)    Forbidden    Only user with same id or admins can modify the data
   *  (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(LOGGED_USER), validate(updateUser), controller.update)
  /**
   * Header
   *  {String} Authorization   User's access token
   *
   * Success
   *  (No Content 204)  Successfully deleted
   *
   * Error
   *  (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   *  (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   *  (Not Found 404)    NotFound      User does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
