import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../EmployeeContext'; // Importez le contexte

function Home() {
  const navigate = useNavigate();
  const { addEmployee } = useEmployeeContext(); // Obtenez la fonction pour ajouter un employé depuis le contexte

  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    department: 'Sales',
    street: '', // Ajoutez les champs de l'adresse
    city: '',
    state: '',
    zipCode: '',
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
    const { street, city, state, zipCode, ...rest } = employeeData; // Extraire les champs de l'adresse
    const newEmployee = { ...rest, street, city, state, zipCode }; // Inclure les nouveaux champs
    addEmployee(newEmployee); // Ajoutez le nouvel employé en utilisant le contexte
  
    setEmployees([...employees, newEmployee]);
    // Réinitialisez les données de l'employé après l'ajout
    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      department: 'Sales',
      street: '', // Réinitialisez les champs de l'adresse
      city: '',
      state: '',
      zipCode: '',
    });
  
  
    // Utilisez navigate pour naviguer vers la page EmployeeList avec les données des employés
    navigate('/employee-list', { state: { employees: [...employees, newEmployee] } });
  }

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
          <button onClick={handleSaveEmployee}>Save</button>
        </form>
      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
    </>
  );
}

export default Home;
