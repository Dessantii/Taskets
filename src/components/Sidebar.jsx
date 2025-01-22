// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import PropTypes from 'prop-types'
import './bar.css';

function Sidebar({ theme, isVisible}) {
  const location = useLocation();
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);
  

  return (  
    <div className={`sidebar ${theme} ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="sidebar-header"></div>
      <nav className="sidebar-menu">
        <Link
          to="/"
          className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <i className="pi pi-home"></i> Início
        </Link>

        <div className="sidebar-link-group">
          <div
            className={`sidebar-button ${isTasksExpanded ? "expanded" : ""}`}
            onClick={() => setIsTasksExpanded(!isTasksExpanded)}
            aria-expanded={isTasksExpanded}
          >
            <i className="pi pi-list"></i> Tarefas
          </div>
          {isTasksExpanded && (
            <div className="sidebar-submenu">
              <Link
                to="/tasks"
                className={`sidebar-link ${location.pathname === "/tasks" ? "active" : ""}`}
              >
                <i className="pi pi-plus"></i> Cadastro de Tarefas
              </Link>
              <Link
                to="/tasks-report"
                className={`sidebar-link ${location.pathname === "/tasks-report" ? "active" : ""}`}
              >
                <i className="pi pi-chart-line"></i> Relatório
              </Link>
            </div>
          )}
        </div>

        <div className="sidebar-link-group">
          <div
            className={`sidebar-button ${isGoalsExpanded ? "expanded" : ""}`}
            onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
            aria-expanded={isGoalsExpanded}
          >
            <i className="pi pi-flag"></i> Metas
          </div>
          {isGoalsExpanded && (
            <div className="sidebar-submenu">
              <Link
                to="/goals"
                className={`sidebar-link ${location.pathname === "/goals" ? "active" : ""}`}
              >
                <i className="pi pi-plus"></i> Cadastro de Metas
              </Link>
              <Link
                to="/goal-report"
                className={`sidebar-link ${location.pathname === "/goal-report" ? "active" : ""}`}
              >
                <i className="pi pi-chart-line"></i> Relatório
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className="sidebar-footer">
        <Button
          label="Configurações"
          className="p-button-text sidebar-footer-button"
          icon="pi pi-cog"
        />
      </div>
    </div>

  );

}
Sidebar.propTypes = {
  handleThemeToggle: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};




export default Sidebar;
