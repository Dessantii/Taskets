// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FaBars } from 'react-icons/fa'; // Importa ícone da Font Awesome // Ícone para alternar sidebar
import PropTypes from 'prop-types'
import './bar.css'

function Navbar({ handleThemeToggle, theme, toggleSidebar }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          Taskets
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/" className="navbar-link">Início</Link>
        <Link to="/tasks" className="navbar-link">Tarefas</Link>
        <Link to="/goals" className="navbar-link">Metas</Link>
      </div>
      <div className="navbar-right">
        <Button
          className="p-button-rounded theme-toggle"
          icon={theme === "light" ? "pi pi-sun" : "pi pi-moon"}
          onClick={handleThemeToggle}
        />
        <Button
          icon={<FaBars />} // Ícone de toggle substituído
          className="p-button-rounded sidebar-toggle"
          onClick={toggleSidebar} // Ação para alternar a visibilidade da sidebar
          aria-label="Toggle Sidebar"
        />

      </div>
    </div>
  );
}

Navbar.propTypes = {
  handleThemeToggle: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
