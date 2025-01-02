import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "primereact/button";
import "./SidebarStyles.css";

function Sidebar({ handleThemeToggle, theme }) {
  const location = useLocation();
  const [isGoalsExpanded, setIsGoalsExpanded] = useState(false);
  const [isTasksExpanded, setIsTasksExpanded] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Taskets</h1>
        <Button
          className="p-button-rounded theme-toggle"
          icon={theme === "light" ? "pi pi-sun" : "pi pi-moon"}
          onClick={handleThemeToggle}
        />
      </div>
      <nav className="sidebar-menu">
        <Link
          to="/"
          className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <Button
            label="Início"
            className="p-button-text sidebar-button"
            icon="pi pi-home"
          />
        </Link>
        <Link
          to="/tasks"
          className={`sidebar-link ${
            location.pathname === "/tasks" ? "active" : ""
          }`}
        >
          <Button
            label="Tarefas"
            className="p-button-text sidebar-button"
            icon="pi pi-list"
            onClick={() => setIsTasksExpanded(!isTasksExpanded)}
            aria-expanded={isTasksExpanded}
          />
          {isTasksExpanded && (
            <div className="sidebar-submenu">
              <Link
                to="/tasks"
                className={`sidebar-link ${
                  location.pathname === "/tasks" ? "active" : ""
                }`}
              >
                <Button
                  label="Cadastro de Tarefas"
                  className="p-button-text sidebar-button"
                  icon="pi pi-plus"
                />
              </Link>
              <Link
                to="/tasks-report"
                className={`sidebar-link ${
                  location.pathname === "/tasks-report" ? "active" : ""
                }`}
              >
                <Button
                  label="Relatório"
                  className="p-button-text sidebar-button"
                  icon="pi pi-chart-line"
                />
              </Link>
            </div>
          )}
            
        </Link>
        <div className="sidebar-link-group">
          <Button
            label="Metas"
            className="p-button-text sidebar-button"
            icon="pi pi-flag"
            onClick={() => setIsGoalsExpanded(!isGoalsExpanded)}
            aria-expanded={isGoalsExpanded}
          />
          {isGoalsExpanded && (
            <div className="sidebar-submenu">
              <Link
                to="/goals"
                className={`sidebar-link ${
                  location.pathname === "/goals" ? "active" : ""
                }`}
              >
                <Button
                  label="Cadastro de Metas"
                  className="p-button-text sidebar-button"
                  icon="pi pi-plus"
                />
              </Link>
              <Link
                to="/goal-report"
                className={`sidebar-link ${
                  location.pathname === "/goal-report" ? "active" : ""
                }`}
              >
                <Button
                  label="Relatório"
                  className="p-button-text sidebar-button"
                  icon="pi pi-chart-line"
                />
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

export default Sidebar;
