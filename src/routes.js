const { Router } = require('express');
const commonUserRoutes = require('./routes/commonUserRoutes');
const authRoutes = require('./routes/authRoutes');

/**
 * Contains all API routes for the application.
 */
const router = Router();

router.use('/health', (req, res) => {
    res.status(200).send("User Service is healthy");
});
router.use('/users/v1', commonUserRoutes);
router.use('/auth/v1', authRoutes);

module.exports = router
