import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "../components/NavigationBar";

const Application: React.FC = () => {
    return (
        <>
            <div className='flex flex-col md:flex-row h-screen w-screen p-2'>
                <div className="flex-1 overflow-y-auto">
                    <Outlet />
                </div>
                <NavigationBar />
            </div>
        </>
    )
}

export default Application;