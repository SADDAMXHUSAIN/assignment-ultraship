# Ultraship Backend - GraphQL API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Start the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The GraphQL API will be available at `http://localhost:4000/graphql`

## Authentication

### Test Users:
- **Admin**: username: `admin`, password: `admin123`
- **Employee**: username: `employee`, password: `emp123`

### Using the API:

1. Login mutation:
```graphql
mutation {
  login(username: "admin", password: "admin123") {
    token
    user {
      id
      username
      role
    }
  }
}
```

2. Use the token in subsequent requests:
```
Authorization: Bearer <token>
```

## GraphQL Queries

### List Employees (with pagination, filtering, sorting)
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

## GraphQL Mutations

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

### Update Employee (Admin only)
```graphql
mutation {
  updateEmployee(id: "1", input: {
    attendance: 96
  }) {
    id
    name
    attendance
  }
}
```

### Delete Employee (Admin only)
```graphql
mutation {
  deleteEmployee(id: "1")
}
```

## Performance Optimizations

1. **Pagination**: Implemented to limit data transfer
2. **Filtering**: Server-side filtering reduces data processing
3. **Sorting**: Efficient in-memory sorting (in production, use database indexes)
4. **Caching**: GraphQL query caching can be added with Apollo Server plugins
5. **DataLoader**: Can be added for N+1 query prevention (when using real database)

