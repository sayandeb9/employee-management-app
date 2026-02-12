const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// Validation helper
function validateEmployee(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length === 0) {
    errors.push('Name is required');
  }
  
  if (!data.email || !data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Valid email is required');
  }
  
  if (!data.department || data.department.trim().length === 0) {
    errors.push('Department is required');
  }
  
  if (!data.role || data.role.trim().length === 0) {
    errors.push('Role is required');
  }
  
  if (!data.hire_date || !data.hire_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
    errors.push('Valid hire date (YYYY-MM-DD) is required');
  }
  
  return errors;
}

// GET all employees or filter by department
router.get('/', (req, res) => {
  const { department } = req.query;
  
  if (department) {
    Employee.getByDepartment(department, (err, employees) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(employees);
    });
  } else {
    Employee.getAll((err, employees) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', details: err.message });
      }
      res.json(employees);
    });
  }
});

// GET single employee by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  Employee.getById(id, (err, employee) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  });
});

// POST create new employee
router.post('/', (req, res) => {
  const errors = validateEmployee(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  Employee.create(req.body, (err, result) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    res.status(201).json({
      message: 'Employee created successfully',
      id: result.lastID
    });
  });
});

// PUT update employee
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const errors = validateEmployee(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Validation failed', details: errors });
  }
  
  Employee.update(id, req.body, (err, result) => {
    if (err) {
      if (err.message.includes('UNIQUE constraint failed')) {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee updated successfully' });
  });
});

// DELETE employee
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  Employee.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Database error', details: err.message });
    }
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json({ message: 'Employee deleted successfully' });
  });
});

module.exports = router;
