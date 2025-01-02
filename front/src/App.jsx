import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Tasks from './pages/Tasks';
import TasksReport from './pages/TasksReport';
import GoalForm from './pages/GoalForm';
import GoalReport from './pages/GoalReport';
import './App.css';
import './AppStyles.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
    const [theme, setTheme] = useState('light');
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

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const handleNewEntry = (goal) => {
        const newValue = prompt(`Quanto você quer adicionar à meta "${goal.name}"?`);
        if (newValue) {
            setGoals((prevGoals) =>
                prevGoals.map((g) =>
                    g.name === goal.name
                        ? { ...g, currentValue: (g.currentValue || 0) + Number(newValue) }
                        : g
                )
            );
        }
    };

    const handleGoalSubmit = (newGoal) => {
        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    const handleThemeToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <Router>
            <div className={`App ${theme}`}>
                {/* Sidebar integrada */}
                <Sidebar handleThemeToggle={handleThemeToggle} theme={theme} />
                {/* Ajuste para acomodar a sidebar */}
                <div className="content" style={{ marginLeft: '250px', padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route path="/tasks-report" element={<TasksReport />} />
                        <Route path="/goals" element={<GoalForm onGoalSubmit={handleGoalSubmit} />} />
                        <Route path="/goal-report" element={<GoalReport goals={goals} onNewEntry={handleNewEntry} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
