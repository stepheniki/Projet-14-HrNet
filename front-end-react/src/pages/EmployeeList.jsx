import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useEmployeeContext } from '../EmployeeContext'; // Importez le contexte

// prend une date en entrée et la convertit en une chaîne de caractères formatée.
// Si la date est nulle ou non définie, elle retourne une chaîne vide.
function formatDateString(date) {
  if (date) {
    return new Date(date).toLocaleDateString();
  }
  return '';
}

  // Utilise le contexte pour accéder à la liste des employés
function EmployeeList() {
  const { employees } = useEmployeeContext(); // Utilisez le contexte pour accéder aux employés

  // Utilise l'API de localisation de React Router pour accéder à l'état de localisation
  const location = useLocation();
  
  // Si l'état de localisation contient une liste d'employés, sinon liste vide.
  const employeesFromLocation = location.state ? location.state.employees : [];


  // Exemples fictifs pour montrer le tri
  const fictitiousEmployees = [
    {
      firstName: 'Marc',
      lastName: 'Morry',
      startDate: '2023-01-15',
      department: 'Sales',
      dateOfBirth: '1985-05-20',
      street: '123 Main St',
      city: 'Ourtosk',
      state: 'CA',
      zipCode: '12345',
    },
    {
      firstName: 'Zoe',
      lastName: 'Parker',
      startDate: '2021-11-10',
      department: 'Sales',
      dateOfBirth: '1985-09-10',
      street: 'Lasters St',
      city: 'Porcjungle',
      state: 'MS',
      zipCode: '12480',
    },
    {
      firstName: 'Fabian',
      lastName: 'Mesny',
      startDate: '2022-11-10',
      department: 'Marketing',
      dateOfBirth: '1990-09-12',
      street: '4213 Boty St',
      city: 'New Hampton',
      state: 'MS',
      zipCode: '25640',
    },
    {
      firstName: 'Jarry',
      lastName: 'Lens',
      startDate: '2022-11-10',
      department: 'Sales',
      dateOfBirth: '1995-09-12',
      street: '126 Klm St',
      city: 'Brougth',
      state: 'NY',
      zipCode: '67890',
    },
    {
      firstName: 'July',
      lastName: 'First',
      startDate: '2020-11-10',
      department: 'Marketing',
      dateOfBirth: '1990-09-12',
      street: '2589 John St',
      city: 'Elm',
      state: 'AL',
      zipCode: '45878',
    },
    {
      firstName: 'Julian',
      lastName: 'Roux',
      startDate: '2018-11-02',
      department: 'Engineering',
      dateOfBirth: '1990-09-12',
      street: '69 Bridge St',
      city: 'Olees',
      state: 'AL',
      zipCode: '45878',
    },

    {
      firstName: 'Marie',
      lastName: 'Salt',
      startDate: '2021-01-10',
      department: 'Sales',
      dateOfBirth: '1980-04-10',
      street: '23 Fromur St',
      city: 'Bronx',
      state: 'NY',
      zipCode: '67890',
    },
    {
      firstName: 'Jimmy',
      lastName: 'Page',
      startDate: '2015-10-10',
      department: 'Human Resources',
      dateOfBirth: '1970-01-12',
      street: 'Jimpo St',
      city: 'Yeston',
      state: 'BT',
      zipCode: '12890',
    },
    {
      firstName: 'Ella',
      lastName: 'Donovan',
      startDate: '2022-11-10',
      department: 'Legal',
      dateOfBirth: '1972-01-13',
      street: 'Calamity St',
      city: 'New Ox',
      state: 'CA',
      zipCode: '65557',
    },

    {
      firstName: 'Joan',
      lastName: 'Thomas',
      startDate: '2023-01-10',
      department: 'Legal',
      dateOfBirth: '1998-05-12',
      street: 'Cityut St',
      city: 'Brighton',
      state: 'NJ',
      zipCode: '12214',
    },
  ];

  // Concaténer les employés enregistrés avec les employés fictifs
  const allEmployees = [...employees, ...fictitiousEmployees];

  // Créez un état pour stocker le texte de recherche
  const [filterText, setFilterText] = useState('');

  // Fonctions tableau
  const columns = [
    {
      name: 'First Name',
      selector: (row) => row.firstName,
      sortable: true,
      cell: (row) => <div className="custom-column">{row.firstName}</div>,
    },
    {
      name: 'Last Name',
      selector: (row) => row.lastName,
      sortable: true,
      cell: (row) => <div className="custom-column-2">{row.lastName}</div>,
    },
    {
      name: 'Start Date',
      selector: (row) => row.startDate,
      sortable: true,
      format: (row) => formatDateString(row.startDate),
    },
    {
      name: 'Department',
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: 'Date of Birth',
      selector: (row) => row.dateOfBirth,
      sortable: true,
      format: (row) => formatDateString(row.dateOfBirth),
    },
    {
      name: 'Street',
      selector: (row) => row.street,
      sortable: true,
    },
    {
      name: 'City',
      selector: (row) => row.city,
      sortable: true,
    },
    {
      name: 'State',
      selector: (row) => row.state,
      sortable: true,
    },
    {
      name: 'Zip Code',
      selector: (row) => row.zipCode,
      sortable: true,
    },
  ];

 // Fonction de recherche
  const filteredEmployees = allEmployees.filter((employee) => {
    const values = Object.values(employee).join(' ').toLowerCase();
    return values.includes(filterText.toLowerCase());
  });

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <input
        type="text"
        placeholder="Search ..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <DataTable
        columns={columns}
        data={filteredEmployees}
        pagination // Activer la pagination
        selectableRows // Activer la sélection des lignes
        onRowClicked={(row) => console.log(row)} // Gérez les actions lorsqu'une ligne est cliquée
      />
      <br />
      <button className='button-click'><Link to="/">Home</Link></button>
    </div>
  );
}

export default EmployeeList;
