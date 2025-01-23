// eslint-disable-next-line no-unused-vars
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home'; // Certifique-se de que este arquivo existe
import Tasks from './pages/Tasks';
import TasksReport from './pages/TasksReport';
import GoalForm from './pages/GoalForm';
import GoalReport from './pages/GoalReport';
import Login from './pages/Login';
import Logout from './components/Logout'; // Importando o componente de logout
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Estado para controlar a visibilidade da sidebar
  const [goals, setGoals] = useState([
    {
      name: 'Comprar bicicleta',
      category: 'purchase',
      targetValue: 1000,
      currentValue: 200,
      deadline: new Date(),
      color: '#FF5733',
      emoji: '🚴',
    },
  ]);

  const handleGoalSubmit = (newGoal) => {
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  };

  const [isAuthenticated] = useState(false);



  const handleThemeToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible); // Alterna a visibilidade da sidebar
  };

  return (
    <Router>
      <div className={`App ${theme}`} style={{ display: 'flex' }}>
        {/* Sidebar */}
        {isSidebarVisible && (
          <Sidebar
            handleThemeToggle={handleThemeToggle}
            theme={theme}
            isVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
        )}

        {/* Conteúdo principal */}
        <div
          className="main-content"
          style={{
            flex: 1, // Permite que o conteúdo ocupe o espaço restante
            transition: 'margin-left 0.3s ease',
          }}
        >
          {/* Navbar */}
          <Navbar
            handleThemeToggle={handleThemeToggle}
            theme={theme}
            toggleSidebar={toggleSidebar}
          />

          {/* Conteúdo principal */}
          <div className="content" style={{ padding: '20px' }}>
            <Routes>
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<Login />} />
              <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}> {/* Usando PrivateRoute.js */}
              <Route path="/Home" element={<Home />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks-report" element={<TasksReport />} />
              <Route path="/goals" element={<GoalForm onGoalSubmit={handleGoalSubmit} />} />
              <Route path="/goal-report" element={<GoalReport goals={goals} />} />
              <Route path="/logout" element={<Logout />} /> {/* Rota de logout */}
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
