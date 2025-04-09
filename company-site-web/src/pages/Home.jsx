// import exImage from '../images/apartment.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../services/useFetch';
import URL_ENDPOINTS from '../utils/urlEndpoints';
import InfoTenantCard from '../components/InfoTenantCard';
import InformativeSection from '../components/InformativeSection';

import apartmentImage from '../images/apartments.jpg';
import locationImg from '../images/locations.png';
import faultFixImg from '../images/tool.jpg';

import { MdEmail } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";
import { FaHouseChimney, FaHouseChimneyUser, FaArrowRightLong } from "react-icons/fa6";
import { UnderlineFromCenterEffect, UnderlineLeftToRightEffect } from '../components/Effects';

export default function Home() {
    const { data: apartmentsData } = useFetch('/api/apartments/');
    const { data: informationData} = useFetch('/api/information/');
    const [availableApartments, setAvailableApartments] = useState([]);
    const [isInformation, setIsInformation] = useState([]);
    // const availableApartments = data.filter(apartment => apartment.is_available).length;

    // Get quantity of apartments
    useEffect(() => {
        setAvailableApartments(apartmentsData.filter(apartment => apartment.is_available === true).length)
    }, [apartmentsData]);

    // Get quantity of information cards
    useEffect(() => {
        setIsInformation(informationData.filter(info => info.is_showing === true).length)
    }, [informationData]);

    return (
        <div className='relative'>
            {/* {!apartmentsLoading  && <Loading />} */}
            {/* {!informationLoading && <Loading />} */}
            {/* HERO */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 -mt-[10px]">
                <img alt="" src={apartmentImage} className="absolute inset-0 -z-10 size-full object-cover object-right md:object-center blur-[5px]" />

                <div className="mx-auto max-w-[1200px] px-5 md:px-8 text-center [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]">
                    <div className="mx-auto max-w-2xl ">
                        <h1 className="text-3xl font-semibold  text-white sm:text-7xl ">
                            Välkommen till bostadsportalen
                        </h1>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
                            Ditt hem, vår omtanke.
                        </p>
                    </div>

                    {/* STATS */}
                    <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 mx-auto max-w-2xl ">
                        {[
                            { name: 'Lediga lägenheter', value: availableApartments },
                            { name: 'Hyresgäster', value: '100+' },
                        ].map((stat) => (
                            <div key={stat.name} className="flex flex-col-reverse gap-1">
                                <dt className="text-gray-300">{stat.name}</dt>
                                <dd className="text-4xl font-semibold text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>

            {/* LINKS */}
            <div className="relative mx-auto max-w-[1200px] px-5 md:px-8 flex justify-center -mt-7">
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-lg sm:text-base  font-semibold sm:grid-cols-2 md:flex  bg-neutral-50  px-10 py-5 p-5 rounded-lg shadow-md w-full lg:w-[80%] justify-between">
                    {[
                        { name: 'Lediga lägenheter', icon: <FaHouseChimney />, href: URL_ENDPOINTS.AVALIBLE_APARTMENTS },
                        { name: 'För Hyresgäster', icon: <FaHouseChimneyUser />, href: URL_ENDPOINTS.FOR_TENANT },
                        // { name: 'Felanmälan', icon: <FaTools />, href: URL_ENDPOINTS.FAULT_REPORT },
                        { name: 'Kontakt', icon: <MdEmail />, href: URL_ENDPOINTS.CONTACT },
                        { name: 'Om oss', icon: <IoMdPerson />, href: URL_ENDPOINTS.ABOUT },
                    ].map((link) => (
                        <Link key={link.name} to={link.href} className='relative group flex items-center gap-2 w-fit text-[var(--primary-color)]'>
                            {link.icon} {link.name}
                            <UnderlineFromCenterEffect color={'bg-[var(--primary-color)]'} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* INFO TO TENANTS */}
            {isInformation > 0 && (

                <div className='max-w-[1200px] mx-auto px-5 md:px-8 mt-20'>
                    <div className="flex flex-col md:flex-row  justify-between mb-8">
                        <h2 className='text-2xl sm:text-3xl font-medium text-gray-900 mb-3 md:mb-0'>
                            Information till hyresgäster
                        </h2>

                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <Link
                                to={URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.INFORMATION}
                                className='group relative flex items-center  text-[var(--secondary-color)] font-semibold hover:text-[var(--secondary-color-hover)] transition-colors duration-300'>
                                Se all aktuell information
                                <FaArrowRightLong className="ml-2" />
                                <UnderlineLeftToRightEffect color={'bg-[var(--secondary-color)]'} />
                            </Link>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-center max-w-[1200px] mx-auto">
                        <InfoTenantCard limit={2} />
                    </div>
                </div>
            )}

            {/* AREA */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-20 flex flex-col md:flex-row-reverse md:gap-10 lg:gap-16 items-center">
                <InformativeSection
                    label={'Våra områden'}
                    text={'På kartan kan du se de olika områden där vi erbjuder bostäder. Vi strävar efter att erbjuda bekväma och attraktiva bostadsområden som passar alla våra hyresgäster.'}
                    url={URL_ENDPOINTS.AVALIBLE_APARTMENTS}
                    linkLabel={'Se lediga lägenheter'}
                    image={locationImg}
                />
            </div>

            {/* FAULT REPORT */}
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-20 flex flex-col md:flex-row md:gap-10 lg:gap-16 items-center">
                <InformativeSection
                    label={'Felanmälan'}
                    text={'Om något i din bostad eller fastigheten behöver åtgärdas kan du enkelt göra en felanmälan. Klicka på knappen för att göra din anmälan.'}
                    url={URL_ENDPOINTS.FOR_TENANT + URL_ENDPOINTS.FAULT_REPORT}
                    linkLabel={'Skicka Felanmälan'}
                    image={faultFixImg}
                />
            </div>
        </div>
    )
}
