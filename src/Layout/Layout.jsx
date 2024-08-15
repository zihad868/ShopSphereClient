import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-135px)]">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;