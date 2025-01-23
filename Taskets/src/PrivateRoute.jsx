import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, redirectTo = '/login', children }) => {
    if (!isAuthenticated) {
        return <Navigate to={redirectTo} />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;