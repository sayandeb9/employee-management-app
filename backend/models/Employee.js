const db = require('../db/database');

class Employee {
  static getAll(callback) {
    const query = 'SELECT * FROM employees ORDER BY id DESC';
    db.all(query, [], callback);
  }

  static getById(id, callback) {
    const query = 'SELECT * FROM employees WHERE id = ?';
    db.get(query, [id], callback);
  }

  static getByDepartment(department, callback) {
    const query = 'SELECT * FROM employees WHERE department = ? ORDER BY id DESC';
    db.all(query, [department], callback);
  }

  static create(employee, callback) {
    const query = `
      INSERT INTO employees (name, email, department, role, hire_date)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      employee.name,
      employee.email,
      employee.department,
      employee.role,
      employee.hire_date
    ];
    db.run(query, params, function(err) {
      callback(err, this);
    });
  }

  static update(id, employee, callback) {
    const query = `
      UPDATE employees
      SET name = ?, email = ?, department = ?, role = ?, hire_date = ?
      WHERE id = ?
    `;
    const params = [
      employee.name,
      employee.email,
      employee.department,
      employee.role,
      employee.hire_date,
      id
    ];
    db.run(query, params, function(err) {
      callback(err, this);
    });
  }

  static delete(id, callback) {
    const query = 'DELETE FROM employees WHERE id = ?';
    db.run(query, [id], function(err) {
      callback(err, this);
    });
  }
}

module.exports = Employee;
