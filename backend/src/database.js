// In-memory database for demonstration
// In production, this would be replaced with a real database (PostgreSQL, MongoDB, etc.)

let employees = [];
let users = [];

// Initialize with sample data
function initializeDatabase() {
  // Sample employees
  employees = [
    {
      id: '1',
      name: 'John Doe',
      age: 28,
      class: 'Engineering',
      subjects: ['Mathematics', 'Physics', 'Computer Science'],
      attendance: 95,
      email: 'john.doe@example.com',
      phone: '+1234567890',
      address: '123 Main St, City, State',
      department: 'IT',
      position: 'Senior Developer',
      salary: 75000,
    },
    {
      id: '2',
      name: 'Jane Smith',
      age: 32,
      class: 'Management',
      subjects: ['Business Administration', 'Economics'],
      attendance: 98,
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      address: '456 Oak Ave, City, State',
      department: 'HR',
      position: 'HR Manager',
      salary: 85000,
    },
    {
      id: '3',
      name: 'Bob Johnson',
      age: 25,
      class: 'Engineering',
      subjects: ['Mathematics', 'Chemistry', 'Engineering'],
      attendance: 92,
      email: 'bob.johnson@example.com',
      phone: '+1234567892',
      address: '789 Pine Rd, City, State',
      department: 'IT',
      position: 'Junior Developer',
      salary: 60000,
    },
    {
      id: '4',
      name: 'Alice Williams',
      age: 30,
      class: 'Design',
      subjects: ['Graphic Design', 'UI/UX'],
      attendance: 96,
      email: 'alice.williams@example.com',
      phone: '+1234567893',
      address: '321 Elm St, City, State',
      department: 'Design',
      position: 'Design Lead',
      salary: 80000,
    },
    {
      id: '5',
      name: 'Charlie Brown',
      age: 27,
      class: 'Engineering',
      subjects: ['Mathematics', 'Physics', 'Engineering'],
      attendance: 94,
      email: 'charlie.brown@example.com',
      phone: '+1234567894',
      address: '654 Maple Dr, City, State',
      department: 'IT',
      position: 'Developer',
      salary: 70000,
    },
    {
      id: '6',
      name: 'Diana Prince',
      age: 29,
      class: 'Management',
      subjects: ['Business Administration', 'Finance'],
      attendance: 97,
      email: 'diana.prince@example.com',
      phone: '+1234567895',
      address: '987 Cedar Ln, City, State',
      department: 'Finance',
      position: 'Financial Analyst',
      salary: 72000,
    },
    {
      id: '7',
      name: 'Edward Norton',
      age: 26,
      class: 'Engineering',
      subjects: ['Computer Science', 'Mathematics'],
      attendance: 91,
      email: 'edward.norton@example.com',
      phone: '+1234567896',
      address: '147 Birch Way, City, State',
      department: 'IT',
      position: 'Developer',
      salary: 68000,
    },
    {
      id: '8',
      name: 'Fiona Green',
      age: 31,
      class: 'Design',
      subjects: ['Graphic Design', 'Marketing'],
      attendance: 99,
      email: 'fiona.green@example.com',
      phone: '+1234567897',
      address: '258 Spruce Ct, City, State',
      department: 'Marketing',
      position: 'Marketing Manager',
      salary: 78000,
    },
    {
      id: '9',
      name: 'George Miller',
      age: 33,
      class: 'Management',
      subjects: ['Business Administration', 'Leadership'],
      attendance: 93,
      email: 'george.miller@example.com',
      phone: '+1234567898',
      address: '369 Willow Pl, City, State',
      department: 'Operations',
      position: 'Operations Manager',
      salary: 90000,
    },
    {
      id: '10',
      name: 'Helen Taylor',
      age: 24,
      class: 'Engineering',
      subjects: ['Computer Science', 'Software Engineering'],
      attendance: 90,
      email: 'helen.taylor@example.com',
      phone: '+1234567899',
      address: '741 Ash Blvd, City, State',
      department: 'IT',
      position: 'Junior Developer',
      salary: 58000,
    },
  ];

  // Sample users for authentication
  users = [
    {
      id: '1',
      username: 'admin',
      password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: admin123
      role: 'admin',
      email: 'admin@example.com',
    },
    {
      id: '2',
      username: 'employee',
      password: '$2a$10$rOzJqZqZqZqZqZqZqZqZqOqZqZqZqZqZqZqZqZqZqZqZqZqZqZqZq', // password: emp123
      role: 'employee',
      email: 'employee@example.com',
    },
  ];

  // Hash passwords properly (in production, use bcrypt)
  const bcrypt = require('bcryptjs');
  users[0].password = bcrypt.hashSync('admin123', 10);
  users[1].password = bcrypt.hashSync('emp123', 10);
}

function getDatabase() {
  return {
    employees,
    users,
    // Helper methods
    getEmployeeById: (id) => employees.find((emp) => emp.id === id),
    getUserByUsername: (username) => users.find((user) => user.username === username),
    addEmployee: (employee) => {
      const newEmployee = { ...employee, id: String(employees.length + 1) };
      employees.push(newEmployee);
      return newEmployee;
    },
    updateEmployee: (id, updates) => {
      const index = employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        employees[index] = { ...employees[index], ...updates };
        return employees[index];
      }
      return null;
    },
    deleteEmployee: (id) => {
      const index = employees.findIndex((emp) => emp.id === id);
      if (index !== -1) {
        employees.splice(index, 1);
        return true;
      }
      return false;
    },
  };
}

module.exports = { initializeDatabase, getDatabase };

