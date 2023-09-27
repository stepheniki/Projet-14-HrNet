import React, { createContext, useContext, useState } from 'react';

// Création d'un nouveau Contexte pour les employés
const EmployeeContext = createContext();

// Provider pour le EmployeeContext. 
// Permet à tous les composants enfants d'accéder à l'état des employés.
export const EmployeeProvider = ({ children }) => {
  
  // useState pour gérer l'état des employés. L'état initial est un tableau vide.
  const [employees, setEmployees] = useState([]);

// Ajouter un nouvel employé à la liste des employés.
  const addEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  // Le Provider rend les enfants et passe l'état des employés et la fonction addEmployee à tous les composants enfants.
  return (
    <EmployeeContext.Provider value={{ employees, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
};

// Permet aux composants d'accéder facilement au EmployeeContext.
export const useEmployeeContext = () => {
  return useContext(EmployeeContext);
};