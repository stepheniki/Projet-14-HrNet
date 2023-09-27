import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useEmployeeContext } from '../EmployeeContext';
import statesList from '../data/states.json';
import { Modal } from 'npm-modal_by_stephen-thomas-2023';

function Home() {

  // useState pour gérer l'état du modal. L'état initial est false, ce qui signifie que le modal est fermé.
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Utilisation du contexte pour accéder à la liste des employés et à la fonction pour ajouter un nouvel employé.
  const { addEmployee, employees } = useEmployeeContext(); 

  // useState pour gérer les données du nouvel employé. L'état initial est un objet avec tous les champs vides.
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null,
    startDate: null,
    department: 'Sales',
    street: '',
    city: '',
    state: '',
    zipCode: '',
  });

  // Appelée chaque fois qu'un champ du formulaire change, mise à jour des données de l'employé avec la nouvelle valeur.
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Vérifiez si le champ est "zipCode" et que la valeur contient uniquement des chiffres
    if (name === 'zipCode' && !/^[0-9]*$/.test(value)) {
      return;
    }
    
    // Sinon, mettez à jour les données de l'employé avec la nouvelle valeur.
    setEmployeeData({
      ...employeeData,
      [name]: value,
    });
  };

  // appellé lorsque les dates de naissance et de début sont modifiées. 
  // Mise à jour des données de l'employé avec la nouvelle date.
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

  // Appelée lorsque l'utilisateur clique sur le bouton "Save". 
  // Vérifie que tous les champs sont remplis...
  const handleSaveEmployee = () => {
    if (
      !employeeData.firstName ||
      !employeeData.lastName ||
      !employeeData.dateOfBirth ||
      !employeeData.startDate ||
      !employeeData.street ||
      !employeeData.city ||
      !employeeData.state ||
      !employeeData.zipCode ||
      !employeeData.department
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // ... ajoute le nouvel employé à la liste
    const newEmployee = { ...employeeData };
    addEmployee(newEmployee);

    // ... ouvre le modal
    setModalIsOpen(true);

    // réinitialise les données de l'employé.
    setEmployeeData({
      firstName: '',
      lastName: '',
      dateOfBirth: null,
      startDate: null,
      department: 'Sales',
      street: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };

  // // Appelé lorsque l'utilisateur ferme le modal. 
  // Mise à jour de l'état du modal pour le fermer.
  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  // Appelé lorsque l'utilisateur soumet le formulaire.
  // Empêche le rechargement de la page...
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
  
    // ... vérifie que le code postal contient exactement 5 chiffres.
    if (employeeData.zipCode.length !== 5) {
      alert("Le code postal doit contenir exactement 5 chiffres.");
      return;
    }
  
    // Appelle la fonction de sauvegarde de l'employé
    handleSaveEmployee(); 
  };

  // Retourne le formulaire pour ajouter un nouvel employé et le bouton pour afficher la liste des employés actuels.
    return (
    <>
       <div className="title">
        <h1>HRnet</h1>
      </div>
      <div className="container">
        <button className='button-click'><Link to="/employee-list">
 View Current Employees</Link></button>

        
        <form className="form" action="#" id="create-employee" onSubmit={handleSubmit}>
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

<button className="button-click" type="submit">Save</button>
        <div className='center'><Modal isOpen={modalIsOpen} content="Employee Created !" onClose={handleCloseModal} />
        </div>
</form>

    </div>
      
      
    </>
  );
}

export default Home;
