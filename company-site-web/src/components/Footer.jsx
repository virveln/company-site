import '../styles/general.css';
import { Link } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import contactDetails from "../utils/contactDetails";
import logo from '/vite.svg';
import URL_ENDPOINTS from '../utils/urlEndpoints';

const Footer = () => {
    return (
        <footer className="bg-[var(--primary-color)] text-white py-16 pb-10 ">
            <div className="grid md:grid-cols-3 gap-12 max-w-[1200px] mx-auto px-5 md:px-8">

                <Link to="/" className=""><img src={logo} alt='logo' className='w-[70px]' /></Link>

                {/* Contact Section */}
                <section>
                    <h3 className=" font-semibold mb-4">Kontakt</h3>
                    <ul className='space-y-2'>
                        <li>
                            <a href='tel:' className="">
                                {contactDetails.telNbr}
                            </a>
                        </li>
                        <li>
                            <a href="mailto:info@hotmail.com" className="relative group flex items-center w-fit text-white hover:text-[var(--gray-color)] transition-colors duration-300" >
                                <FaEnvelope className="mr-2" />
                                {contactDetails.mail}
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </a>
                        </li>
                    </ul>
                </section>

                {/* Explore Section */}
                <section>
                    <h3 className="font-semibold mb-4">Utforska</h3>
                    <ul className="space-y-2 text-white">
                        <li>
                            <Link to={URL_ENDPOINTS.AVALIBLE_APARTMENTS} className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                Lediga lägenheter
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={URL_ENDPOINTS.FOR_TENANT} className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                För hyresgäser
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={URL_ENDPOINTS.CONTACT} className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                Kontakt
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={URL_ENDPOINTS.ABOUT} className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                Om oss
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link to={URL_ENDPOINTS.FAULT_REPORT} className="relative group  hover:text-[var(--gray-color)] transition-colors duration-300">
                                Felanmälan
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                Cookies
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                        <li>
                            <Link className="relative group hover:text-[var(--gray-color)] transition-colors duration-300">
                                Integritetspolicy
                                <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>

            {/* Horizontal Break Line */}
            <div className="border-t border-white my-8 mx-10"></div>

            {/* Footer Bottom Section */}
            <section className="text-center text-white">
                <p>&copy; 2025 Company Name. All Rights Reserved.</p>
            </section>
        </footer>

    );
};

export default Footer;
