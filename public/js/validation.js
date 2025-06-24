document.addEventListener('DOMContentLoaded', function() {
  // User validation
  const userForm = document.getElementById('userForm');
  if (userForm) {
    userForm.addEventListener('submit', function(e) {
      const email = document.getElementById('email').value;
      const mobile = document.getElementById('mobile').value;
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        e.preventDefault();
        return false;
      }
      
      // Mobile validation
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(mobile)) {
        alert('Please enter a valid 10-digit mobile number');
        e.preventDefault();
        return false;
      }
      
      return true;
    });
  }
  
  // Task form validation
  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
      const userId = document.getElementById('user_id').value;
      const taskName = document.getElementById('task_name').value;
      const taskType = document.getElementById('task_type').value;
      
      if (!userId) {
        alert('Please select a user');
        e.preventDefault();
        return false;
      }
      
      if (!taskName.trim()) {
        alert('Please enter a task name');
        e.preventDefault();
        return false;
      }
      
      if (!taskType) {
        alert('Please select a task type');
        e.preventDefault();
        return false;
      }
      
      return true;
    });
  }
});