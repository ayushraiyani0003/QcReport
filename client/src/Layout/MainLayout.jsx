import Header from "../Componant/Header"; // note spelling
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <main className=" overflow-hidden p-4">
                <Outlet />
            </main>
        </div>
    );
};                                     

export default MainLayout;
