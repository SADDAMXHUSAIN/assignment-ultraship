const { isAdmin, generateToken, verifyPassword } = require('./auth');

const resolvers = {
  Query: {
    employees: (parent, args, context) => {
      const { filter, sort, page = 1, pageSize = 10 } = args;
      let { employees } = context.db;

      // Apply filters
      if (filter) {
        employees = employees.filter((emp) => {
          if (filter.class && emp.class !== filter.class) return false;
          if (filter.department && emp.department !== filter.department) return false;
          if (filter.minAge && emp.age < filter.minAge) return false;
          if (filter.maxAge && emp.age > filter.maxAge) return false;
          if (filter.minAttendance && emp.attendance < filter.minAttendance) return false;
          if (filter.maxAttendance && emp.attendance > filter.maxAttendance) return false;
          return true;
        });
      }

      // Apply sorting
      if (sort) {
        employees = [...employees].sort((a, b) => {
          const aValue = a[sort.field];
          const bValue = b[sort.field];
          
          if (aValue === undefined || bValue === undefined) return 0;
          
          let comparison = 0;
          if (typeof aValue === 'string') {
            comparison = aValue.localeCompare(bValue);
          } else {
            comparison = aValue - bValue;
          }
          
          return sort.order === 'ASC' ? comparison : -comparison;
        });
      }

      // Calculate pagination
      const totalCount = employees.length;
      const totalPages = Math.ceil(totalCount / pageSize);
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedEmployees = employees.slice(startIndex, endIndex);

      return {
        employees: paginatedEmployees,
        totalCount,
        page,
        pageSize,
        totalPages,
      };
    },

    employee: (parent, args, context) => {
      return context.db.getEmployeeById(args.id);
    },

    me: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Authentication required');
      }
      const user = context.db.users.find((u) => u.id === context.user.id);
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    },
  },

  Mutation: {
    login: (parent, args, context) => {
      const { username, password } = args;
      const user = context.db.getUserByUsername(username);
      
      if (!user || !verifyPassword(password, user.password)) {
        throw new Error('Invalid username or password');
      }

      const token = generateToken(user);
      return {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      };
    },

    addEmployee: (parent, args, context) => {
      // Require authentication
      if (!context.user) {
        throw new Error('Authentication required');
      }
      
      // Require admin role
      if (!isAdmin(context.user)) {
        throw new Error('Admin access required');
      }

      const newEmployee = context.db.addEmployee(args.input);
      return newEmployee;
    },

    updateEmployee: (parent, args, context) => {
      // Require authentication
      if (!context.user) {
        throw new Error('Authentication required');
      }
      
      // Require admin role
      if (!isAdmin(context.user)) {
        throw new Error('Admin access required');
      }

      const updatedEmployee = context.db.updateEmployee(args.id, args.input);
      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }
      return updatedEmployee;
    },

    deleteEmployee: (parent, args, context) => {
      // Require authentication
      if (!context.user) {
        throw new Error('Authentication required');
      }
      
      // Require admin role
      if (!isAdmin(context.user)) {
        throw new Error('Admin access required');
      }

      const deleted = context.db.deleteEmployee(args.id);
      if (!deleted) {
        throw new Error('Employee not found');
      }
      return true;
    },
  },
};

module.exports = { resolvers };

