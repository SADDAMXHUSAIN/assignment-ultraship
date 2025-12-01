import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './EmployeeGrid.css';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int, $filter: EmployeeFilter, $sort: SortInput) {
    employees(page: $page, pageSize: $pageSize, filter: $filter, sort: $sort) {
      employees {
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
      totalCount
      page
      pageSize
      totalPages
    }
  }
`;

const EmployeeGrid = () => {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [filter, setFilter] = useState({});
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables: {
      page,
      pageSize: 10,
      sort: { field: sortField, order: sortOrder },
      filter: Object.keys(filter).length > 0 ? filter : null,
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortField(field);
      setSortOrder('ASC');
    }
  };

  const handleRowClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const employees = data?.employees?.employees || [];
  const { totalPages, totalCount } = data?.employees || {};

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' },
    { key: 'class', label: 'Class' },
    { key: 'subjects', label: 'Subjects' },
    { key: 'attendance', label: 'Attendance %' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position' },
  ];

  return (
    <div className="employee-grid-container">
      <div className="grid-header">
        <h2>Employee Grid View</h2>
        <div className="view-switcher">
          <button
            className="view-btn active"
            onClick={() => navigate('/')}
          >
            Grid
          </button>
          <button
            className="view-btn"
            onClick={() => navigate('/tile')}
          >
            Tile
          </button>
        </div>
      </div>

      <div className="grid-controls">
        <div className="pagination-info">
          Showing {employees.length} of {totalCount} employees
        </div>
        <div className="pagination-controls">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="page-info">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="sortable"
                >
                  {col.label}
                  {sortField === col.key && (
                    <span className="sort-indicator">
                      {sortOrder === 'ASC' ? ' ↑' : ' ↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                onClick={() => handleRowClick(employee.id)}
                className="table-row"
              >
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>{employee.class}</td>
                <td>{employee.subjects.join(', ')}</td>
                <td>
                  <span className={`attendance-badge ${employee.attendance >= 95 ? 'high' : employee.attendance >= 90 ? 'medium' : 'low'}`}>
                    {employee.attendance}%
                  </span>
                </td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeGrid;

