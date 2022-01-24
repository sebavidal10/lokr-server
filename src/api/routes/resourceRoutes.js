const express = require('express');
const { validate } = require('express-validation');
const resourceController = require('../controllers/resourceController.js');
const { createResource } = require('../validations/resourcesValidation');

const router = express.Router();

router
  .route('/')
  .get(resourceController.list)
  .post(validate(createResource), resourceController.create);

module.exports = router;
