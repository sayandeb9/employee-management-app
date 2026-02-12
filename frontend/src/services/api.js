const API_URL = 'http://localhost:5000/api';

export const employeeService = {
  async getAllEmployees() {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
  },

  async getEmployeesByDepartment(department) {
    const response = await fetch(`${API_URL}/employees?department=${encodeURIComponent(department)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return response.json();
  },

  async getEmployee(id) {
    const response = await fetch(`${API_URL}/employees/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch employee');
    }
    return response.json();
  },

  async createEmployee(employee) {
    const response = await fetch(`${API_URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create employee');
    }
    return response.json();
  },

  async updateEmployee(id, employee) {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update employee');
    }
    return response.json();
  },

  async deleteEmployee(id) {
    const response = await fetch(`${API_URL}/employees/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete employee');
    }
    return response.json();
  },
};
