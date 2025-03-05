import apartmentImage from '../images/apartments.jpg';
import InfoTenantS from '../components/InfoTenantS';
import URL_ENDPOINTS from '../utils/urlEndpoints';
import { useEffect, useState } from 'react';
import useFetch from '../services/useFetch';

import { MdEmail } from "react-icons/md";
import { FaTools, FaHouseUser } from "react-icons/fa";
import { IoMdPerson } from "react-icons/io";
import { FaHouse } from "react-icons/fa6";


const links = [
    { name: 'Lediga lägenheter', icon: <FaHouse />, href: URL_ENDPOINTS.AVALIBLE_APARTMENTS },
    { name: 'För Hyresgäster', icon: <FaHouseUser />, href: URL_ENDPOINTS.FOR_TENANT },
    { name: 'Felanmälan', icon: <FaTools />, href: URL_ENDPOINTS.FAULT_REPORT },
    { name: 'Kontakt', icon: <MdEmail />, href: URL_ENDPOINTS.CONTACT },
    { name: 'Om oss', icon: <IoMdPerson />, href: URL_ENDPOINTS.ABOUT },
]

export default function Home() {
    const { data } = useFetch('/api/apartments/');
    const [availableApartments, setAvailableApartments] = useState([]);

    const stats = [
        { name: 'Lediga lägenheter', value: availableApartments },
        { name: 'Hyresgäster', value: '100+' },
    ]

    useEffect(() => {
        setAvailableApartments(data.filter(apartment => apartment.is_available === true).length)
    }, [data]);
    
    return (
        <div className='mb-10'>
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 mt-[-10px]">
                <img alt="" src={apartmentImage} className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center blur-[5px]" />

                <div className="mx-auto max-w-[1200px] px-5 md:px-8 text-center [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="mx-auto max-w-2xl ">
                        <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl ">
                            Välkommen till bostadsportalen
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                            Ditt hem, vår omtanke.
                        </p>
                    </div>

                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 mx-auto max-w-2xl ">
                        {stats.map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse gap-1">
                                <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                                <dd className="text-4xl font-semibold tracking-tight text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            <div className="mx-auto max-w-[1200px] mt-10 mb-20 px-10 flex justify-center">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold  sm:grid-cols-2 md:flex lg:gap-x-10 ">
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className='relative group flex items-center gap-2 '>
                            {link.icon} {link.name} <span aria-hidden="true">&rarr;</span>
                            <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-[var(--primary-color)] transform scale-x-0 group-hover:scale-x-100 transition-all duration-300 origin-bottom"></span>
                        </a>
                    ))}
                </div>

            </div>

            <div>
                <h2 className='max-w-[1200px] px-10 mx-auto mb-5 text-2xl font-medium text-center'>Information till hyresgäster</h2>
                <InfoTenantS />
            </div>

        </div>
    )
}
