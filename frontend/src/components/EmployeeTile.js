import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import './EmployeeTile.css';

const GET_EMPLOYEES = gql`
  query GetEmployees($page: Int, $pageSize: Int, $filter: EmployeeFilter, $sort: SortInput) {
    employees(page: $page, pageSize: $pageSize, filter: $filter, sort: $sort) {
      employees {
        id
        name
        age
        class
        attendance
        email
        department
        position
      }
      totalCount
      page
      pageSize
      totalPages
    }
  }
`;

const EmployeeTile = () => {
  const [page, setPage] = useState(1);
  const [showMenuId, setShowMenuId] = useState(null);
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEES, {
    variables: {
      page,
      pageSize: 12,
      sort: { field: 'name', order: 'ASC' },
    },
    fetchPolicy: 'cache-and-network',
  });

  const handleTileClick = (employeeId) => {
    navigate(`/employee/${employeeId}`);
  };

  const handleMenuToggle = (e, employeeId) => {
    e.stopPropagation();
    setShowMenuId(showMenuId === employeeId ? null : employeeId);
  };

  const handleAction = (e, action, employeeId) => {
    e.stopPropagation();
    setShowMenuId(null);
    // Handle actions (edit, flag, delete)
    console.log(`${action} employee ${employeeId}`);
    alert(`${action} action for employee ${employeeId}`);
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const employees = data?.employees?.employees || [];
  const { totalPages, totalCount } = data?.employees || {};

  return (
    <div className="employee-tile-container">
      <div className="tile-header">
        <h2>Employee Tile View</h2>
        <div className="view-switcher">
          <button
            className="view-btn"
            onClick={() => navigate('/')}
          >
            Grid
          </button>
          <button
            className="view-btn active"
            onClick={() => navigate('/tile')}
          >
            Tile
          </button>
        </div>
      </div>

      <div className="tile-controls">
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

      <div className="tile-grid">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="employee-tile"
            onClick={() => handleTileClick(employee.id)}
          >
            <div className="tile-header-section">
              <div className="tile-avatar">
                {employee.name.charAt(0).toUpperCase()}
              </div>
              <button
                className="tile-menu-btn"
                onClick={(e) => handleMenuToggle(e, employee.id)}
                aria-label="More options"
              >
                ⋮
              </button>
              {showMenuId === employee.id && (
                <div className="tile-menu">
                  <button
                    onClick={(e) => handleAction(e, 'edit', employee.id)}
                    className="menu-item"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleAction(e, 'flag', employee.id)}
                    className="menu-item"
                  >
                    Flag
                  </button>
                  <button
                    onClick={(e) => handleAction(e, 'delete', employee.id)}
                    className="menu-item delete"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <div className="tile-content">
              <h3 className="tile-name">{employee.name}</h3>
              <div className="tile-details">
                <div className="tile-detail-item">
                  <span className="detail-label">Age:</span>
                  <span className="detail-value">{employee.age}</span>
                </div>
                <div className="tile-detail-item">
                  <span className="detail-label">Class:</span>
                  <span className="detail-value">{employee.class}</span>
                </div>
                <div className="tile-detail-item">
                  <span className="detail-label">Department:</span>
                  <span className="detail-value">{employee.department}</span>
                </div>
                <div className="tile-detail-item">
                  <span className="detail-label">Position:</span>
                  <span className="detail-value">{employee.position}</span>
                </div>
                <div className="tile-detail-item">
                  <span className="detail-label">Attendance:</span>
                  <span className={`detail-value attendance ${employee.attendance >= 95 ? 'high' : employee.attendance >= 90 ? 'medium' : 'low'}`}>
                    {employee.attendance}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTile;

