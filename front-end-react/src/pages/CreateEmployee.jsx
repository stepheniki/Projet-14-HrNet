import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; //selection de date
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../EmployeeContext'; // Importez le contexte
import statesList from '../data/states.json';


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
    const { street, city, state, zipCode, ...rest } = employeeData;
    const newEmployee = { ...rest, street, city, state, zipCode };
    addEmployee(newEmployee);
  
    setEmployees([...employees, newEmployee]);
  
    // Réinitialisez les données de l'employé après l'ajout
    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      department: 'Sales', // Réinitialisez le département à sa valeur par défaut
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
  
    // Utilisez navigate pour naviguer vers la page EmployeeList avec les données des employés
    navigate('/employee-list', { state: { employees: [...employees, newEmployee] } });
  };

  return (
    <>
       <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <button className='button-click'><Link to="/employee-list">
 View Current Employees</Link></button>

        
        <form className="form" action="#" id="create-employee">
        <h2>Create Employee</h2>
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
  <input
    id="street"
    type="text"
    name="street"
    value={employeeData.street}
    onChange={handleInputChange}
  />

  <label htmlFor="city">City</label>
  <input
    id="city"
    type="text"
    name="city"
    value={employeeData.city}
    onChange={handleInputChange}
  />

<label className='bold' htmlFor="state">State</label>
<select
  name="state"
  id="state"
  value={employeeData.state}
  onChange={handleInputChange}
>
  <option value="">Select State</option>
  {statesList.map((state) => (
    <option key={state.abbreviation} value={state.abbreviation}>
      {state.name}
    </option>
  ))}
</select>

  <label htmlFor="zip-code">Zip Code</label>
  <input
    id="zip-code"
    type="text"
    name="zipCode"
    value={employeeData.zipCode}
    onChange={handleInputChange}
  />
          </fieldset>
    
          <label  htmlFor="department">Department</label>
<select className='bold'
  name="department"
  id="department"
  value={employeeData.department}
  onChange={handleInputChange}
>
  <option value="Sales">Sales</option>
  <option value="Marketing">Marketing</option>
  <option value="Engineering">Engineering</option>
  <option value="Human Resources">Human Resources</option>
  <option value="Legal">Legal</option>
</select>
</form><br/>
<button className="button-click" onClick={handleSaveEmployee}>Save</button>

      </div>
      <div id="confirmation" className="modal">
        Employee Created!
      </div>
      
    </>
  );
}

export default Home;
