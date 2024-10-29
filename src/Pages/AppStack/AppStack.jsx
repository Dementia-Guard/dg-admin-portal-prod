import React, { useEffect } from 'react';
import LocalStore from '../../Store/LocalStore';
import Header from '../../Components/Header/Header';
import MainSideNav from '../../Components/SideBar/MainSideNav';
import AdminStack from './AdminStack/AdminStack';
import VendorStack from './VendorStack/VendorStack';
import CsrStack from './CsrStack/CsrStack';
import { Navigate, Outlet } from 'react-router-dom';
import Authenticate from '../../Store/Authenticate';
import { useAuth } from '../../Context/AuthContext';

export default function AppStack() {
    const { isAuthenticated } = useAuth();

    // If the user is unauthenticated, redirect them to the signIn
    if (!isAuthenticated()) {
        return <Navigate to="/auth/signIn" />;
    }
    return (
        <>
            <Header />
            <div className="main-wrapper">
                <MainSideNav />
                <Outlet />
            </div>
        </>
    );
}
