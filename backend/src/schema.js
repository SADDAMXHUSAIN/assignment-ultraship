const typeDefs = `
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
    email: String
    phone: String
    address: String
    department: String
    position: String
    salary: Int
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
    email: String
    phone: String
    address: String
    department: String
    position: String
    salary: Int
  }

  input EmployeeUpdateInput {
    name: String
    age: Int
    class: String
    subjects: [String!]
    attendance: Int
    email: String
    phone: String
    address: String
    department: String
    position: String
    salary: Int
  }

  input EmployeeFilter {
    class: String
    department: String
    minAge: Int
    maxAge: Int
    minAttendance: Int
    maxAttendance: Int
  }

  input SortInput {
    field: String!
    order: SortOrder!
  }

  enum SortOrder {
    ASC
    DESC
  }

  type EmployeeConnection {
    employees: [Employee!]!
    totalCount: Int!
    page: Int!
    pageSize: Int!
    totalPages: Int!
  }

  type Query {
    # Public query - no auth required for demo
    employees(
      filter: EmployeeFilter
      sort: SortInput
      page: Int = 1
      pageSize: Int = 10
    ): EmployeeConnection!
    
    employee(id: ID!): Employee
    
    # Authentication query
    me: User
  }

  type Mutation {
    # Authentication
    login(username: String!, password: String!): AuthPayload!
    
    # Employee mutations - require authentication
    addEmployee(input: EmployeeInput!): Employee! # Admin only
    updateEmployee(id: ID!, input: EmployeeUpdateInput!): Employee! # Admin only
    deleteEmployee(id: ID!): Boolean! # Admin only
  }
`;

module.exports = { typeDefs };

