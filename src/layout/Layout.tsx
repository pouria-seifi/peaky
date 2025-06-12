import React from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Sidebar from "../components/sidebar/sidebar";

interface LayoutProps {
  children: React.ReactNode;
  bodyIdStyle?: string;
  sideBar?: boolean;
}

const Layout = ({ children, bodyIdStyle, sideBar = false }: LayoutProps) => {

    return (
        <React.Fragment>
            <main
                id={bodyIdStyle}
                className="min-h-screen"
            >
                {
                    sideBar && <Sidebar />
                }
                {children}
            </main>
        </React.Fragment>
    );
}

export default Layout;