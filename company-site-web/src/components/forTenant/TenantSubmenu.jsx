import { Link, useLocation, } from "react-router-dom";

import URL_ENDPOINTS from '../../utils/urlEndpoints';
import { UnderlineFromCenterEffect } from "../common/Effects";

import { FaInfoCircle, FaTools } from "react-icons/fa";
import { MdPolicy, MdHealthAndSafety } from "react-icons/md";
import { FaCreditCard, FaPeopleRoof } from "react-icons/fa6";
import { RiInboxArchiveFill, RiInboxUnarchiveFill } from "react-icons/ri";

export default function TenantSubmenu() {
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const section = pathParts[pathParts.length - 1];

    const submenu = [
        { title: 'Info till hyresgäster', path: URL_ENDPOINTS.INFORMATION, icon: <FaInfoCircle /> },
        { title: 'Felanmälan', path: URL_ENDPOINTS.FAULT_REPORT, icon: <FaTools /> },
        { title: 'Uthyrningspolicy', path: URL_ENDPOINTS.RENTAL_POLICY, icon: <MdPolicy /> },
        { title: 'Hyresinbetalningar', path: URL_ENDPOINTS.RENT_PAYMENT, icon: <FaCreditCard /> },
        { title: 'Flytta in', path: URL_ENDPOINTS.MOVING_IN, icon: <RiInboxUnarchiveFill /> },
        { title: 'Flytta ut', path: URL_ENDPOINTS.MOVING_OUT, icon: <RiInboxArchiveFill /> },
        { title: 'Skötsel av bostaden', path: URL_ENDPOINTS.HOME_MAINTENANCE, icon: <MdHealthAndSafety /> },
        { title: 'Trivsel', path: URL_ENDPOINTS.NEIGHBORS, icon: <FaPeopleRoof /> },
    ];

    return (
        <ul className="grid sm:grid-cols-2 md:block gap-4 md:space-y-4 md:w-[200px] mb-10 md:mb-0 mt-[-50px] md:mt-[0] font-medium text-[var(--primary-color)] p-6 w-full bg-gray-100 rounded-lg shadow-md md:p-0 md:bg-transparent md:rounded-none md:shadow-none">
            {submenu.map((item) => (
                // <li key={item.title} className={`relative group  w-fit cursor-pointer ${`${section}` === item.path ? "font-bold" : ""} `}>
                //     <Link to={`/${URL_ENDPOINTS.FOR_TENANT}${item.path}`} className="flex items-center gap-2">{item.icon} {item.title}</Link>
                //     <span className={`absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom rounded-lg`}></span>
                // </li>
                <li key={item.title} className={` flex items-center gap-2 w-fit text-lg sm:text-base cursor-pointer ${`${section}` === item.path ? "font-black tracking-wide" : "font-semibold"} `}>
                    <span className={`${`${section}` === item.path ? "text-xl -ml-0.5 sm:-ml-1" : ""} `}>{item.icon}</span>
                    <Link to={`/${URL_ENDPOINTS.FOR_TENANT}${item.path}`} className="relative group"> {item.title}
                        <UnderlineFromCenterEffect color={'bg-[var(--primary-color)]'} />
                    </Link>
                </li>
            ))}
        </ul>
    )
}