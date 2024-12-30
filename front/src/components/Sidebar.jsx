import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import './SidebarStyles.css';

function Sidebar({ handleThemeToggle, theme }) {
    const location = useLocation();

    return (
        <div className="sidebar">
            <h1>Taskets</h1>
            <Button
                className="p-button-rounded theme-toggle"
                icon={theme === 'light' ? 'pi pi-sun' : 'pi pi-moon'}
                onClick={handleThemeToggle}
            />
            <nav>
                <Link to="/" className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}>
                    <Button label="Início" className="p-button-text sidebar-button" />
                </Link>
                <Link to="/tasks" className={`sidebar-link ${location.pathname === '/tasks' ? 'active' : ''}`}>
                    <Button label="Tarefas" className="p-button-text sidebar-button" />
                </Link>
            </nav>
        </div>
    );
}

export default Sidebar;