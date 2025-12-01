# Ultraship - Employee Management System

A full-stack employee management application built with React (frontend) and GraphQL API (Node.js backend).

## Features

### Frontend
- ✅ Hamburger menu with one-level sub-menu
- ✅ Horizontal menu with sample items
- ✅ Grid view showing employee data (10 columns)
- ✅ Tile view showing necessary fields
- ✅ Action buttons (edit, flag, delete) on each tile
- ✅ Detailed view (popup style) when clicking a tile
- ✅ Navigation back to tile/grid view
- ✅ Beautiful, modern UI with responsive design

### Backend
- ✅ GraphQL API with Node.js
- ✅ Employee data model with all required fields
- ✅ Queries: List employees (with filters), single employee, pagination
- ✅ Mutations: Add, update, delete employees
- ✅ Pagination & Sorting
- ✅ Authentication & Authorization (JWT, role-based: admin, employee)
- ✅ Performance optimizations

## Project Structure

```
assignment-ultraship/
├── backend/          # GraphQL API server
│   ├── src/
│   │   ├── index.js      # Server entry point
│   │   ├── schema.js      # GraphQL schema
│   │   ├── resolvers.js   # GraphQL resolvers
│   │   ├── database.js    # In-memory database
│   │   └── auth.js        # Authentication utilities
│   └── package.json
└── frontend/         # React application
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js         # Main app component
    │   └── apolloClient.js # Apollo Client setup
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (optional, defaults are provided):
```bash
JWT_SECRET=your-super-secret-jwt-key-change-in-production
PORT=4000
```

4. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Authentication

### Test Users

- **Admin User:**
  - Username: `admin`
  - Password: `admin123`
  - Role: `admin` (can add, update, delete employees)

- **Employee User:**
  - Username: `employee`
  - Password: `emp123`
  - Role: `employee` (read-only access)

### Using Authentication

1. Login at `/login` route
2. Token is stored in localStorage
3. Token is automatically included in GraphQL requests
4. Admin-only mutations require admin role

## GraphQL API Examples

### Query Employees (with pagination, filtering, sorting)
```graphql
query {
  employees(
    page: 1
    pageSize: 10
    filter: { class: "Engineering", minAge: 25 }
    sort: { field: "name", order: ASC }
  ) {
    employees {
      id
      name
      age
      class
      subjects
      attendance
    }
    totalCount
    page
    pageSize
    totalPages
  }
}
```

### Get Single Employee
```graphql
query {
  employee(id: "1") {
    id
    name
    age
    class
    subjects
    attendance
    email
    phone
    address
    department
    position
    salary
  }
}
```

### Add Employee (Admin only)
```graphql
mutation {
  addEmployee(input: {
    name: "New Employee"
    age: 30
    class: "Engineering"
    subjects: ["Math", "Science"]
    attendance: 95
  }) {
    id
    name
  }
}
```

## Performance Optimizations

1. **Pagination**: Limits data transfer and improves load times
2. **Server-side Filtering**: Reduces client-side processing
3. **Efficient Sorting**: In-memory sorting (in production, use database indexes)
4. **Apollo Client Caching**: Reduces redundant network requests
5. **Cache-and-Network Policy**: Provides instant cached data while fetching fresh data

## Technologies Used

### Backend
- Node.js
- Apollo Server
- GraphQL
- Express
- JWT (jsonwebtoken)
- bcryptjs

### Frontend
- React 18
- Apollo Client
- React Router
- GraphQL
- CSS3 (Modern styling)

## Development Notes

- The backend uses an in-memory database for demonstration purposes
- In production, replace with a real database (PostgreSQL, MongoDB, etc.)
- Add DataLoader for N+1 query prevention when using a real database
- Implement proper error handling and logging
- Add input validation and sanitization
- Add rate limiting for API endpoints
- Implement proper CORS configuration for production

## License

ISC

