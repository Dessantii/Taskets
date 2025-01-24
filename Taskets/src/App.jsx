import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksReport from './pages/TasksReport';
import GoalForm from './pages/GoalForm';
import GoalReport from './pages/GoalReport';
import Login from './pages/Login';
import Logout from './components/Logout';
import Register from './pages/Register';
import PrivateRoute from './PrivateRoute';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    const [theme, setTheme] = useState('light');
    const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Inicializa como false
    const [goals, setGoals] = useState([
        { /* Seus dados de metas */ },
    ]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        setIsAuthenticated(!!storedToken);
        if (!!storedToken) {
            setIsSidebarVisible(true); // Mostra a sidebar se houver token
        }
    }, [isAuthenticated]); // Executa toda vez que isAuthenticated muda

    const handleGoalSubmit = (newGoal) => {
        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const handleLoginSuccess = (token) => {
        localStorage.setItem('auth_token', token);
        setIsAuthenticated(true);
        setIsSidebarVisible(true); // Garante que a sidebar apareça após o login
    };

    const handleLogoutSuccess = () => {
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
        setIsSidebarVisible(false); // Esconde a sidebar no logout
        window.location.href = '/login'; // Redireciona para /login
    };

    return (
      <Router>
      <div className={`App ${theme}`} style={{ display: 'flex' }}>
          {/* Renderização condicional da Sidebar (agora correta) */}
          {isAuthenticated && ( // Renderiza o container da sidebar apenas se autenticado
              <div className={`sidebar-container ${isSidebarVisible ? 'visible' : ''}`}> {/* Container com classe condicional */}
                  <Sidebar
                      handleThemeToggle={handleThemeToggle}
                      theme={theme}
                      toggleSidebar={toggleSidebar}
                  />
              </div>
          )}

          <div
              className="main-content"
              style={{
                  flex: 1,
                  transition: 'margin-left 0.3s ease',
                  marginLeft: isAuthenticated && isSidebarVisible ? '250px' : 0, // Margem condicional
              }}
          >
              <Navbar
                  handleThemeToggle={handleThemeToggle}
                  theme={theme}
                  toggleSidebar={toggleSidebar}
                  isAuthenticated={isAuthenticated}
                  handleLogoutSuccess={handleLogoutSuccess}
              />

              <div className="content" style={{ padding: '20px' }}>
                        <Routes>
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="/" element={<Navigate to="/Login" />} />
                            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                                <Route path="/Home" element={<Home />} />
                                <Route path="/tasks" element={<Tasks />} />
                                <Route path="/tasks-report" element={<TasksReport />} />
                                <Route path="/goals" element={<GoalForm onGoalSubmit={handleGoalSubmit} />} />
                                <Route path="/goal-report" element={<GoalReport goals={goals} />} />
                                <Route path="/logout" element={<Logout onLogout={handleLogoutSuccess} />} />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;