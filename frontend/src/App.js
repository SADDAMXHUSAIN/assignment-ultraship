import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import EmployeeGrid from './components/EmployeeGrid';
import EmployeeTile from './components/EmployeeTile';
import EmployeeDetail from './components/EmployeeDetail';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<EmployeeGrid />} />
          <Route path="tile" element={<EmployeeTile />} />
          <Route path="employee/:id" element={<EmployeeDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

