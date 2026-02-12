# Employee Management System

A full-stack employee management application with CRUD operations, built with Node.js, Express, SQLite, and React.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, and Delete employee records
- 🔍 **Search & Filter**: Filter employees by department
- 📊 **Employee Fields**: ID, Name, Email, Department, Role, Hire Date
- 🛡️ **Data Validation**: Input validation and error handling
- 🎨 **Clean UI**: Modern, responsive React interface
- 🚀 **RESTful API**: Well-structured API endpoints

## Tech Stack

### Backend
- **Node.js** with **Express.js** - RESTful API server
- **SQLite3** - Lightweight database
- **CORS** - Cross-origin resource sharing
- **Body-parser** - Request body parsing

### Frontend
- **React** - UI framework
- **Modern CSS** - Clean, responsive styling
- **Fetch API** - API communication

## Project Structure

```
employee-management-app/
├── backend/
│   ├── db/
│   │   └── database.js       # SQLite database setup
│   ├── models/
│   │   └── Employee.js       # Employee data model
│   ├── routes/
│   │   └── employees.js      # API route handlers
│   └── server.js             # Express server
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeForm.js    # Add/Edit form
│   │   │   ├── EmployeeForm.css
│   │   │   ├── EmployeeList.js    # Employee table
│   │   │   └── EmployeeList.css
│   │   ├── services/
│   │   │   └── api.js             # API service
│   │   ├── App.js
│   │   └── App.css
│   └── package.json
└── package.json
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sayandeb9/employee-management-app.git
cd employee-management-app
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd frontend
npm install
cd ..
```

## Running the Application

### Start Backend Server

```bash
npm run server
```

The backend API will run on `http://localhost:5000`

### Start Frontend (in a new terminal)

```bash
cd frontend
npm start
```

The React app will run on `http://localhost:3000`

## API Endpoints

### Get All Employees
```
GET /api/employees
```

### Get Employees by Department
```
GET /api/employees?department=Engineering
```

### Get Single Employee
```
GET /api/employees/:id
```

### Create Employee
```
POST /api/employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "role": "Software Engineer",
  "hire_date": "2024-01-15"
}
```

### Update Employee
```
PUT /api/employees/:id
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering",
  "role": "Senior Software Engineer",
  "hire_date": "2024-01-15"
}
```

### Delete Employee
```
DELETE /api/employees/:id
```

### Health Check
```
GET /api/health
```

## Usage

1. **View Employees**: The main page displays all employees in a table format
2. **Filter by Department**: Use the filter input to search employees by department
3. **Add Employee**: Click "Add Employee" button and fill in the form
4. **Edit Employee**: Click the "Edit" button next to any employee
5. **Delete Employee**: Click the "Delete" button (with confirmation)

## Database Schema

The `employees` table has the following structure:

| Column     | Type    | Constraints           |
|------------|---------|----------------------|
| id         | INTEGER | PRIMARY KEY, AUTO INCREMENT |
| name       | TEXT    | NOT NULL             |
| email      | TEXT    | UNIQUE, NOT NULL     |
| department | TEXT    | NOT NULL             |
| role       | TEXT    | NOT NULL             |
| hire_date  | TEXT    | NOT NULL (YYYY-MM-DD) |

## Error Handling

- Input validation for all fields
- Email format validation
- Duplicate email prevention
- User-friendly error messages
- HTTP status codes for different scenarios

## Screenshots

### Employee List View
![Employee List](https://github.com/user-attachments/assets/3a1ea85a-8b01-4a12-9007-ebef005264c2)

### Department Filter
![Filter by Department](https://github.com/user-attachments/assets/d3b7871a-2db1-438a-ae07-f7678b8b2272)

### Add Employee Form
![Add Employee](https://github.com/user-attachments/assets/c275891d-8a76-400d-95fb-66f2211c0b8e)

### Edit Employee Form
![Edit Employee](https://github.com/user-attachments/assets/651e5de7-d511-4fe8-b8d2-7bc83e64e657)

## License

ISC

## Author

Sayan Deb
