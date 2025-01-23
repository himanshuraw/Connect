import React from "react";
import { Outlet } from "react-router";

const Authentication: React.FC = () => {
    return (
        <>
            <div>Authentication layout [ CONNECT ]</div>
            <Outlet />
        </>
    )
}

export default Authentication;