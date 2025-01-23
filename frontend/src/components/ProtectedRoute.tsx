import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const ProtectedRoute: React.FC = () => {
    const { user, loading } = useAppSelector(state => state.auth);

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner or message while checking authentication
    }

    if (!user) {
        console.log("can't find token")
        return <Navigate to={`/login`} replace />
    }

    return <Outlet />
}

export default ProtectedRoute;