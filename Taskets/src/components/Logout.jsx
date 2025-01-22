// Logout.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth_token'); // Remove o token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
