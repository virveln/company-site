import { Link } from 'react-router-dom';

import contactDetails from "../../utils/contactDetails";
import URL_ENDPOINTS from '../../utils/urlEndpoints';
import { UnderlineFromCenterEffect } from '../common/Effects';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaClock } from "react-icons/fa6";
import logo from '/vite.svg';

const Footer = () => {
    return (
        <footer className="py-16 pb-10 bg-[var(--primary-color)] text-white">
            <div className='max-w-[1200px] mx-auto px-5 md:px-8'>
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4  ">
                    <section className='h-fit w-fit'>
                        <Link to="/" className=""><img src={logo} alt='Logga' className='w-[70px] ' /></Link>
                    </section>
                    {/* Contact Section */}
                    <section>
                        <h3 className="mb-4 pb-2 font-semibold border-b-3 border-[var(--primary-color-hover)]">Kontakt</h3>
                        <ul className='space-y-2 '>
                            {[
                                {
                                    icon: <FaPhoneAlt />,
                                    content: <a href='tel:' className="relative group">{contactDetails.telNbr}
                                        <UnderlineFromCenterEffect color={'bg-white'} />
                                    </a>
                                },
                                {
                                    icon: <FaEnvelope />,
                                    content: <a href="mailto:info@hotmail.com" className="relative group" >{contactDetails.mail}
                                        <UnderlineFromCenterEffect color={'bg-white'} />
                                    </a>
                                },
                                {
                                    icon: <FaClock />,
                                    content: <p className="">Mån - Fre: 8:00 - 17:00</p>
                                },
                            ].map((item, index) => (
                                <li key={index} className='flex items-center gap-4'>
                                    {item.icon}
                                    {item.content}
                                </li>
                            ))}
                        </ul>
                    </section>
                    {/* Explore Section */}
                    <section>
                        <h3 className="mb-4 pb-2 font-semibold border-b-3 border-[var(--primary-color-hover)]">Utforska</h3>
                        <ul className="space-y-2 ">
                            {[
                                { label: 'Lediga lägenheter', url: URL_ENDPOINTS.AVALIBLE_APARTMENTS },
                                { label: 'Kontakt', url: URL_ENDPOINTS.CONTACT },
                                { label: 'Om oss', url: URL_ENDPOINTS.ABOUT },
                                { label: 'Cookies', url: '#' },
                                { label: 'Integritetspolicy', url: '#' },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link to={item.url} className="relative group">
                                        {item.label}
                                        <UnderlineFromCenterEffect color={'bg-white'} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                    {/* For Tenant Section */}
                    <section>
                        <h3 className="mb-4 pb-2 font-semibold border-b-3 border-[var(--primary-color-hover)]">För hyresgäster</h3>
                        <ul className="space-y-2 ">
                            {[
                                { label: 'Info till hyresgäster', url: `${URL_ENDPOINTS.FOR_TENANT}${URL_ENDPOINTS.INFORMATION}` },
                                { label: 'Felanmälan', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.FAULT_REPORT },
                                { label: 'Uthyrningspolicy', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.RENTAL_POLICY },
                                { label: 'Hyresinbetalningar', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.RENT_PAYMENT },
                                { label: 'Flytta in', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.MOVING_IN },
                                { label: 'Flytta ut', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.MOVING_OUT },
                                { label: 'Skötsel av bostaden', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.HOME_MAINTENANCE },
                                { label: 'Trivsel', url: URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.NEIGHBORS },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link to={item.url} className="relative group">
                                        {item.label}
                                        <UnderlineFromCenterEffect color={'bg-white'} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
                {/* Footer Bottom Section */}
                <section className="text-sm">
                    <p className='mt-8 pt-4 border-t-3 border-[var(--primary-color-hover)] w-full'>&copy; 2025 Bostadsportalen</p>
                </section>
            </div>
        </footer>

    );
};

export default Footer;
