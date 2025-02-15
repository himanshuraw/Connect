import React from "react";
import { Outlet } from "react-router";
import NavigationBar from "../components/NavigationBar";

const Application: React.FC = () => {
    return (
        <>
            <div
                className='
                h-screen w-screen p-2
                flex flex-col 
                md:flex-row'
            >
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Outlet />
                </div>
                <NavigationBar />
            </div>
        </>
    )
}

export default Application;