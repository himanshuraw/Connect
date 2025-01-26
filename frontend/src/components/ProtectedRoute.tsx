import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../store/hooks";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAppSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message while checking authentication
    }

    if (!user) {
        return <Navigate to={`/login`} replace />
    }

    return <Outlet />
}

export default ProtectedRoute;