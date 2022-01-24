const express = require('express');
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const resourceRoutes = require('./resourceRoutes');

const router = express.Router();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

/**
 * status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * resources
 */
router.use('/resources', resourceRoutes);

/**
 * users
 */
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

/**
 * swagger
 */
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
