const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { body } = require('express-validator');

// Add Task
router.get('/add', taskController.addTaskForm);
router.post('/add', 
  [
    body('user_id').notEmpty().withMessage('User is required'),
    body('task_name').notEmpty().withMessage('Task name is required'),
    body('task_type').isIn(['Pending', 'Done']).withMessage('Invalid task type')
  ],
  taskController.addTask
);

// List Tasks
router.get('/', taskController.listTasks);

// Get Tasks by User ID
router.get('/user/:id', taskController.getTasksByUser);

module.exports = router;