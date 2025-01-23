import './App.css';
import React, { useState, useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
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
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
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
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Moveu para cima

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        setIsAuthenticated(!!token);
    }, []);

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

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    const handleLogoutSuccess = () => {
        setIsAuthenticated(false);
    }

    return (
        <Router>
            <div className={`App ${theme}`} style={{ display: 'flex' }}>
                {isSidebarVisible && (
                    <Sidebar
                        handleThemeToggle={handleThemeToggle}
                        theme={theme}
                        isVisible={isSidebarVisible}
                        toggleSidebar={toggleSidebar}
                    />
                )}

                <div className="main-content" style={{ flex: 1, transition: 'margin-left 0.3s ease' }}>
                    <Navbar
                        handleThemeToggle={handleThemeToggle}
                        theme={theme}
                        toggleSidebar={toggleSidebar}
                    />

                    <div className="content" style={{ padding: '20px' }}>
                        <Routes>
                            <Route path="/Register" element={<Register />} />
                            <Route path="/Login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                            <Route path="/" element={<Navigate to="/Login" />} /> {/* Redirecionamento para o login */}
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