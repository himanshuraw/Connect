import React from "react";
import { Outlet } from "react-router";

const Application: React.FC = () => {
    return (
        <>
            <div>Application</div>
            <Outlet />
        </>
    )
}

export default Application;