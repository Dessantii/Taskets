import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => { // Aceita a prop props
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth_token'); // Limpa o token
        props.onLogout(); // Chama a função onLogout
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <div>
            <h1>Logout</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;