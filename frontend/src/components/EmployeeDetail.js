import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import './EmployeeDetail.css';

const GET_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
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
`;

const EmployeeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <div className="loading">Loading employee details...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const employee = data?.employee;

  if (!employee) {
    return <div className="error">Employee not found</div>;
  }

  return (
    <>
      <div className="detail-overlay" onClick={() => navigate(-1)} />
      <div className="employee-detail">
        <div className="detail-header">
          <button className="close-btn" onClick={() => navigate(-1)}>
            ×
          </button>
          <h2>Employee Details</h2>
        </div>

        <div className="detail-content">
          <div className="detail-avatar-section">
            <div className="detail-avatar">
              {employee.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="detail-name">{employee.name}</h1>
            <p className="detail-position">{employee.position}</p>
          </div>

          <div className="detail-info-grid">
            <div className="info-card">
              <div className="info-label">ID</div>
              <div className="info-value">{employee.id}</div>
            </div>

            <div className="info-card">
              <div className="info-label">Age</div>
              <div className="info-value">{employee.age} years</div>
            </div>

            <div className="info-card">
              <div className="info-label">Class</div>
              <div className="info-value">{employee.class}</div>
            </div>

            <div className="info-card">
              <div className="info-label">Department</div>
              <div className="info-value">{employee.department}</div>
            </div>

            <div className="info-card">
              <div className="info-label">Attendance</div>
              <div className={`info-value attendance ${employee.attendance >= 95 ? 'high' : employee.attendance >= 90 ? 'medium' : 'low'}`}>
                {employee.attendance}%
              </div>
            </div>

            <div className="info-card">
              <div className="info-label">Salary</div>
              <div className="info-value">${employee.salary?.toLocaleString() || 'N/A'}</div>
            </div>

            <div className="info-card full-width">
              <div className="info-label">Email</div>
              <div className="info-value">{employee.email || 'N/A'}</div>
            </div>

            <div className="info-card full-width">
              <div className="info-label">Phone</div>
              <div className="info-value">{employee.phone || 'N/A'}</div>
            </div>

            <div className="info-card full-width">
              <div className="info-label">Address</div>
              <div className="info-value">{employee.address || 'N/A'}</div>
            </div>

            <div className="info-card full-width">
              <div className="info-label">Subjects</div>
              <div className="info-value">
                <div className="subjects-list">
                  {employee.subjects.map((subject, index) => (
                    <span key={index} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-actions">
          <button className="action-btn secondary" onClick={() => navigate(-1)}>
            Back to List
          </button>
          <button className="action-btn primary">
            Edit Employee
          </button>
        </div>
      </div>
    </>
  );
};

export default EmployeeDetail;

