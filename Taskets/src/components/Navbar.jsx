import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FaBars } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './bar.css';

function Navbar({ handleThemeToggle, theme, toggleSidebar, isAuthenticated, handleLogoutSuccess }) {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">
                    Taskets
                </Link>
            </div>

            {/* Renderização condicional dos links do centro */}
            {isAuthenticated && (
                <div className="navbar-center">
                    <Link to="/Home" className="navbar-link">Início</Link>
                    <Link to="/tasks" className="navbar-link">Tarefas</Link>
                    <Link to="/goals" className="navbar-link">Metas</Link>
                </div>
            )}

            <div className="navbar-right">
                <Button
                    className="p-button-rounded theme-toggle"
                    icon={theme === "light" ? "pi pi-sun" : "pi pi-moon"}
                    onClick={handleThemeToggle}
                />
                {/* Botão de toggle da sidebar (sempre visível) */}
                {isAuthenticated && (
                    <Button
                        icon={<FaBars />}
                        className="p-button-rounded sidebar-toggle"
                        onClick={toggleSidebar}
                        aria-label="Toggle Sidebar"
                    />
                )}

                {/* Renderização condicional do botão de Logout */}
                {isAuthenticated && (
                    <Button
                        label="Logout"
                        icon="pi pi-sign-out"
                        onClick={handleLogoutSuccess}
                        className="p-button-rounded"
                    />
                )}
            </div>
        </div>
    );
}

Navbar.propTypes = {
    handleThemeToggle: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired, // Adicione a prop isAuthenticated
    handleLogoutSuccess: PropTypes.func.isRequired, // Adicione a prop handleLogoutSuccess
};

export default Navbar;