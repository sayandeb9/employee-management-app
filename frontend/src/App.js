import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import { employeeService } from './services/api';

function App() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    if (departmentFilter) {
      const filtered = employees.filter(
        emp => emp.department.toLowerCase().includes(departmentFilter.toLowerCase())
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees(employees);
    }
  }, [departmentFilter, employees]);

  const loadEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Failed to load employees. Make sure the server is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleSaveEmployee = async (formData) => {
    setError('');
    try {
      if (editingEmployee) {
        await employeeService.updateEmployee(editingEmployee.id, formData);
      } else {
        await employeeService.createEmployee(formData);
      }
      setShowForm(false);
      setEditingEmployee(null);
      loadEmployees();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteEmployee = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setError('');
      try {
        await employeeService.deleteEmployee(id);
        loadEmployees();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
      </header>

      <div className="container">
        {error && <div className="error-message">{error}</div>}

        {!showForm ? (
          <>
            <div className="toolbar">
              <button onClick={handleAddEmployee} className="btn btn-primary">
                Add Employee
              </button>
              <div className="filter-group">
                <input
                  type="text"
                  placeholder="Filter by department..."
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="filter-input"
                />
                {departmentFilter && (
                  <button
                    onClick={() => setDepartmentFilter('')}
                    className="btn btn-secondary"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <div className="loading">Loading employees...</div>
            ) : (
              <EmployeeList
                employees={filteredEmployees}
                onEdit={handleEditEmployee}
                onDelete={handleDeleteEmployee}
              />
            )}
          </>
        ) : (
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSaveEmployee}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default App;
