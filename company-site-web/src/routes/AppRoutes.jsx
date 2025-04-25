import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import URL_ENDPOINTS from '../utils/urlEndpoints';

import Home from "../pages/Home";
import Apartments from "../pages/Apartments";
import ForTenant from "../pages/ForTenant";
import Contact from "../pages/Contact";
import About from "../pages/About";
import NotFound from "../pages/NotFound";
import Navbar from "../components/layout/navbar/Navbar";
import Footer from "../components/layout/Footer";

import FaultReporttSection from "../components/forTenant/FaultReportSection";
import InfoSection from "../components/forTenant/InfoSection";
import MaintenanceSection from "../components/forTenant/MaintenanceSection";
import MovingInSection from "../components/forTenant/MovingInSection";
import MovingOutSection from "../components/forTenant/MovingOutSection";
import NeighborsSection from "../components/forTenant/Neighbors";
import RentalPolicySection from "../components/forTenant/RentalPolicySection";
import RentPaymentSection from "../components/forTenant/RentPaymentSection";

import ApartmentDetailed from "../components/apartments/ApartmentDetailed";
import InfoDetailed from "../components/forTenant/InfoDetailed";

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
                <div className="flex-grow mt-20 mb-20">
                    <Routes >
                        <Route path="/" element={<Home />} />
                        <Route path={URL_ENDPOINTS.AVALIBLE_APARTMENTS} element={<Apartments />} />
                        <Route path={URL_ENDPOINTS.APARTMENT_DETAILED} element={<ApartmentDetailed />} />
                        <Route path={`${URL_ENDPOINTS.FOR_TENANT}`} element={<ForTenant />} >
                            <Route path={URL_ENDPOINTS.INFORMATION} element={<InfoSection />} />
                            <Route path={URL_ENDPOINTS.FAULT_REPORT} element={<FaultReporttSection />} />
                            <Route path={URL_ENDPOINTS.RENTAL_POLICY} element={<RentalPolicySection />} />
                            <Route path={URL_ENDPOINTS.RENT_PAYMENT} element={<RentPaymentSection />} />
                            <Route path={URL_ENDPOINTS.MOVING_IN} element={<MovingInSection />} />
                            <Route path={URL_ENDPOINTS.MOVING_OUT} element={<MovingOutSection />} />
                            <Route path={URL_ENDPOINTS.HOME_MAINTENANCE} element={<MaintenanceSection />} />
                            <Route path={URL_ENDPOINTS.NEIGHBORS} element={<NeighborsSection />} />
                        </Route>
                        <Route path={`${URL_ENDPOINTS.FOR_TENANT}${URL_ENDPOINTS.INFORMATION_DETAILED}`} element={<InfoDetailed />} />
                        <Route path={URL_ENDPOINTS.CONTACT} element={<Contact />} />
                        <Route path={URL_ENDPOINTS.ABOUT} element={<About />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default AppRoutes;
