// App.js
import './App.css';
import Home from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} /> {/* Ne pas passer employees ici */}
        <Route path="/employee-list" element={<EmployeeList />} /> {/* Ne pas passer employees ici */}
      </Routes>
    </Router>
  );
}

export default App;
