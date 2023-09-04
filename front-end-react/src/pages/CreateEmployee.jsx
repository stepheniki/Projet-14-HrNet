import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';

function Home() {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    department: 'Sales',
  });

  const [employees, setEmployees] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  const handleDateOfBirthChange = (date) => {
    setEmployeeData({
      ...employeeData,
      dateOfBirth: date,
    });
  };

  const handleStartDateChange = (date) => {
    setEmployeeData({
      ...employeeData,
      startDate: date,
    });
  };

  const handleSaveEmployee = () => {
    const newEmployee = { ...employeeData };
    setEmployees([...employees, newEmployee]);
    // Réinitialisez les données de l'employé après l'ajout
    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      department: 'Sales',
    });
  };

  return (
    <>
      <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employee-list">View Current Employees</Link>

        <h2>Create Employee</h2>
        <form className="form" action="#" id="create-employee">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            value={employeeData.firstName}
            onChange={handleInputChange}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            name="lastName"
            value={employeeData.lastName}
            onChange={handleInputChange}
          />

          <label htmlFor="date-of-birth">Date of Birth</label>
          <DatePicker
            id="date-of-birth"
            selected={employeeData.dateOfBirth}
            onChange={handleDateOfBirthChange}
          />

          <label htmlFor="start-date">Start Date</label>
          <DatePicker
            id="start-date"
            selected={employeeData.startDate}
            onChange={handleStartDateChange}
          />
    
                    <fieldset className="address">
                        <legend>Address</legend>
    
                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />
    
                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />
    
                        <label htmlFor="state">State</label>
                        <select name="state" id="state"></select>
    
                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>
    
                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>
                 <button onClick={handleSaveEmployee}>Save</button>
      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
      <div className="employee-list">
        <h2>Employee List</h2>
        <ul>
          {employees.map((employee, index) => (
            <li key={index}>
              {employee.firstName} {employee.lastName}
            </li>
          ))}
        </ul>
      </div>
    </>
            )}
    
    export default Home;