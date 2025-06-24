const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');

exports.addTaskForm = async (req, res) => {
  try {
    const users = await User.query();
    res.render('tasks/add', { users });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to fetch users');
    res.redirect('/tasks/add');
  }
};

exports.addTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const users = await User.query();
      return res.render('tasks/add', { 
        errors: errors.array(), 
        task: req.body,
        users 
      });
    } catch (err) {
      console.error(err);
      req.flash('error', 'Failed to fetch users');
      return res.redirect('/tasks/add');
    }
  }

  try {
    await Task.query().insert({
      user_id: req.body.user_id,
      task_name: req.body.task_name,
      task_type: req.body.task_type
    });
    req.flash('success', 'Task added successfully');
    res.redirect('/tasks/add');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add task');
    res.redirect('/tasks/add');
  }
};

exports.listTasks = async (req, res) => {
  try {
    const tasks = await Task.query().withGraphFetched('user');
    res.render('tasks/list', { tasks });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to fetch tasks');
    res.redirect('/');
  }
};

exports.getTasksByUser = async (req, res) => {
  try {
    const tasks = await Task.query()
      .where('user_id', req.params.id)
      .withGraphFetched('user');
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};