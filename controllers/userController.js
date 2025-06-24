const { validationResult } = require('express-validator');
const User = require('../models/User');
const excel = require('exceljs');

exports.addUserForm = (req, res) => {
  res.render('users/add');
};

exports.addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('users/add', { errors: errors.array(), user: req.body });
  }

  try {
    await User.query().insert({
      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile
    });
    req.flash('success', 'User added successfully');
    res.redirect('/users/add');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to add user');
    res.redirect('/users/add');
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.query();
    res.render('users/list', { users });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to fetch users');
    res.redirect('/');
  }
};

exports.exportUsers = async (req, res) => {
  try {
    const users = await User.query().withGraphFetched('tasks');
    
    const workbook = new excel.Workbook();
    const userWorksheet = workbook.addWorksheet('Users');
    const taskWorksheet = workbook.addWorksheet('Tasks');
    
    // Users sheet
    userWorksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Mobile', key: 'mobile', width: 20 }
    ];
    
    users.forEach(user => {
      userWorksheet.addRow({
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile
      });
    });
    
    // Tasks sheet
    taskWorksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'User ID', key: 'user_id', width: 10 },
      { header: 'Task Name', key: 'task_name', width: 30 },
      { header: 'Task Type', key: 'task_type', width: 15 }
    ];
    
    users.forEach(user => {
      if (user.tasks && user.tasks.length > 0) {
        user.tasks.forEach(task => {
          taskWorksheet.addRow({
            id: task.id,
            user_id: user.id,
            task_name: task.task_name,
            task_type: task.task_type
          });
        });
      }
    });
    
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=users_and_tasks.xlsx'
    );
    
    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to export data');
    res.redirect('/users');
  }
};