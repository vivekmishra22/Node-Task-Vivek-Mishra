const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');

// Add User
router.get('/add', userController.addUserForm);
router.post('/add', 
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('mobile').matches(/^[0-9]{10}$/).withMessage('Invalid mobile number (10 digits required)')
  ],
  userController.addUser
);

// List Users
router.get('/', userController.listUsers);

// Export Users
router.get('/export', userController.exportUsers);

module.exports = router;