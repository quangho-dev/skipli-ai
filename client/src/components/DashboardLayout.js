import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    const isAuth = localStorage.getItem('phoneNumber')

    return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default DashboardLayout