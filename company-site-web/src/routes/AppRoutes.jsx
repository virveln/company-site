import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Apartments from "../pages/Apartments";
import ApartmentDetails from "../components/ApartmentDetails";
import ForTenant from '../pages/ForTenant';
import Contact from "../pages/Contact";
import About from "../pages/About";
import FaultReport from "../pages/FaultReport";
import NotFound from "../pages/NotFound";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import URL_ENDPOINTS from '../utils/urlEndpoints';
import { useEffect } from "react";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

const AppRoutes = () => {

    return (
        <Router >
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
                <Navbar />
                {/* <div className="flex-grow mt-20 p-5"> */}
                <div className="flex-grow mt-20">
                    <Routes >
                        <Route path="/" element={<Home />} />
                        <Route path={URL_ENDPOINTS.AVALIBLE_APARTMENTS} element={<Apartments />} />
                        <Route path={URL_ENDPOINTS.APARTMENT_DETAILED} element={<ApartmentDetails />} />
                        <Route path={URL_ENDPOINTS.FOR_TENANT} element={<ForTenant />} />
                        <Route path={URL_ENDPOINTS.CONTACT} element={<Contact />} />
                        <Route path={URL_ENDPOINTS.ABOUT} element={<About />} />
                        <Route path={URL_ENDPOINTS.FAULT_REPORT} element={<FaultReport />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRoutes;
