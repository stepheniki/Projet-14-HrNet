import React from 'react';
import './App.css';
import Home from './pages/CreateEmployee';
import EmployeeList from './pages/EmployeeList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EmployeeProvider } from './EmployeeContext'; // Importez le contexte ici

function App() {
  return (
    <Router>
      <EmployeeProvider> {/* Enveloppez l'application avec le contexte */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;
