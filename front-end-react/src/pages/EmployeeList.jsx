import React from 'react';
import { Link, useLocation } from 'react-router-dom';


function formatDateString(date) {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
  return '';
}

function EmployeeList() {
  const location = useLocation();
  const employees = location.state ? location.state.employees : [];

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <table id="employee-table" className="table table-bordered table-striped table-hover">
  <thead>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Start Date</th>
      <th>Department</th>
      <th>Date of Birth</th>
      <th>Street</th>
      <th>City</th>
      <th>State</th>
      <th>Zip Code</th>
    </tr>
  </thead>
  <tbody>
    {employees.map((employee, index) => (
      <tr key={index}>
        <td>{employee.firstName}</td>
        <td>{employee.lastName}</td>
        <td>{formatDateString(employee.startDate)}</td>
        <td>{employee.department}</td>
        <td>{formatDateString(employee.dateOfBirth)}</td>
        <td>{employee.street}</td>
        <td>{employee.city}</td>
        <td>{employee.state}</td>
        <td>{employee.zipCode}</td>
      </tr>
    ))}
  </tbody>
</table>
<br/>
      <button className='button-click'><Link to="/">Home</Link></button>
    </div>
  );
}

export default EmployeeList;
