import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
import API from '../../services/api-service';
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TABTITLES from "../../utils/tabTitles";
import ApartmentPhotoGallery from './ApartmentPhotoGallery';
import InterestForm from "./InterestForm";
import Breadcrumbs from "../Breadcrumbs";
import NotFound from '../../pages/NotFound';
import Loading from "../Loading";

import { FaCheck } from "react-icons/fa";
import { LuRuler } from "react-icons/lu";
import { MdOutlineBed } from "react-icons/md";
import { IoCardOutline } from "react-icons/io5";
import { BsClockHistory } from "react-icons/bs";
import { FaStairs } from "react-icons/fa6";

export default function ApartmentDetailed() {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [showInterestForm, setShowInterestForm] = useState(false);
    const formRef = useRef(null);
    // const apartment = dataTest.find(a => formatTitleForUrl(a.address) === apartmentAddress);

    useEffect(() => {
        async function fetchApartment() {
            try {
                const data = await API.getApartment(id);
                if (!data) throw new Error("Not found");
                setApartment(data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchApartment();
    }, [id]);

    // For fetching map
    function makeAddressToMapUrl(address) {
        return address.replace(/ /g, "+");
    }

    // Scroll to form
    const handleFormButtonClick = () => {
        setShowInterestForm(prev => !prev);

        setTimeout(() => {
            if (formRef.current) {
                const yOffset = -110;
                const yPosition = formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: yPosition, behavior: "smooth" });
                // formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };


    if (loading) return <Loading />;
    if (error || !apartment) return <NotFound />;

    return (
        <>
            {apartment && (
                <>
                    <title>{`${apartment.title} ${TABTITLES.APARTMENT_DETAILED}`}</title>

                    <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-4 ">

                        <Breadcrumbs
                            previousPages={[
                                { url: '/', label: 'Hem' },
                                { url: `/${URL_ENDPOINTS.AVALIBLE_APARTMENTS}`, label: 'Lediga lägenheter' }
                            ]}
                            currentPage={apartment.title}
                        />

                        {/* TITLE, CITY, INTEREST FORM BUTTON */}
                        <div className="hidden md:flex justify-between mb-2">
                            <h1 className=" text-xl sm:text-3xl text-gray-900">{apartment.title}, {apartment.city}</h1>
                            <button onClick={() => handleFormButtonClick()} className="hidden md:block  w-[170px] p-2 h-fit cursor-pointer text-center font-semibold text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] transition-all duration-300">
                                Intresseanmälan
                            </button>
                        </div>

                        {/* -||- ON PHONE */}
                        <div className="md:hidden fixed bottom-0 left-0 z-1000 flex justify-between items-center w-full p-5 bg-[var(--primary-color)] ">
                            <h2 className="inline-flex text-white">{apartment.title}, {apartment.city}</h2>
                            <button onClick={() => handleFormButtonClick()} className="text-center w-[140px] p-2 h-fit cursor-pointer text-sm font-semibold text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] transition-all duration-300">
                                Intresseanmälan
                            </button>
                        </div>
                    </div>

                    {/* PHOTO GALLERY */}
                    <div className="max-w-[1200px] mx-auto sm:px-8">
                        <ApartmentPhotoGallery />
                    </div>

                    <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-4 ">
                        <div className="flex flex-col md:flex-row-reverse gap-5 md:mt-10 justify-between ">

                            {/* FAST FACTS */}
                            {/* <div className="flex items-baseline gap-3 sm:block">
                                        <h3 className='flex items-center gap-2 min-w-25 text-sm text-gray-400 uppercase sm:min-w-0'><IoCardOutline className="sm:hidden" />Hyra</h3>
                                        <p className="text-lg md:text-base lg:text-lg">{apartment.rent} kr/mån</p>
                                    </div>
                                    <span className='hidden border-l border-gray-200 sm:block' />
                                    <div className='flex items-baseline gap-3 sm:block col-span-3'>
                                        <h3 className='flex items-center gap-2 min-w-25 text-sm text-gray-400 uppercase sm:min-w-0'><BsClockHistory className="sm:hidden" />Tillträde</h3>
                                        <p className="text-lg md:text-base lg:text-lg">{apartment.access}</p>
                                    </div>
                                    <div className='flex items-baseline gap-3 sm:block row-start-2'>
                                        <h3 className='flex items-center gap-2 min-w-25 text-sm text-gray-400 uppercase sm:min-w-0'><MdOutlineBed className="sm:hidden" />Rum</h3>
                                        <p className="text-lg md:text-base lg:text-lg">{apartment.rooms} rok</p>
                                    </div>
                                    <span className='row-start-2 hidden border-l border-gray-200 sm:block' />
                                    <div className='flex items-baseline gap-3 sm:block row-start-2'>
                                        <h3 className='flex items-center gap-2 min-w-25 text-sm text-gray-400 uppercase sm:min-w-0'><LuRuler className="sm:hidden" /> Yta</h3>
                                        <p className="text-lg md:text-base lg:text-lg">{apartment.square_meter} kvm</p>
                                    </div>
                                    <span className='row-start-2 hidden border-l border-gray-200 sm:block' />
                                    <div className='flex items-baseline gap-3 sm:block row-start-2'>
                                        <h3 className='flex items-center gap-2 min-w-25 text-sm text-gray-400 uppercase sm:min-w-0'><FaStairs className="sm:hidden" />Våning</h3>
                                        <p className="text-lg md:text-base lg:text-lg">{apartment.floor_level}</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => handleFormButtonClick()} className=" text-center px-3 py-2 cursor-pointer font-semibold text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] ">
                                    Intresseanmälan
                                </button>
                            </div> */}

                            {/* ALTERNATIVE 2 */}
                            <div className=" flex flex-col gap-1 h-fit p-[20px] lg:px-[30px] bg-white border border-gray-100 rounded-lg shadow-md md:w-[60%] lg:w-[48%]">
                                <div className='space-y-2 mb-3 max-w-[400px] *:flex *:items-end *:gap-3'>
                                    {[
                                        { label: "Hyra", icon: <IoCardOutline />, value: `${apartment.rent} kr/mån` },
                                        { label: "Rum", icon: <MdOutlineBed />, value: `${apartment.rooms} rok`, rowStart: '2' },
                                        { label: "Yta", icon: <LuRuler />, value: `${apartment.square_meter} kvm`, rowStart: '2' },
                                        { label: "Våning", icon: <FaStairs />, value: apartment.floor_level, rowStart: '2' },
                                        { label: "Tillträde", icon: <BsClockHistory />, value: apartment.access, colSpan: '3' },
                                    ].map((item) => (
                                        <div key={item.label}>
                                            <h3 className='flex items-center gap-2 min-w-25 md:min-w-30 text-sm text-gray-400 uppercase '>{item.icon}{item.label}</h3>
                                            <p className="text-lg md:text-base lg:text-lg">{item.value}</p>
                                        </div>
                                    )
                                    )}
                                </div>
                                <button type="button" onClick={() => handleFormButtonClick()} className=" text-center px-3 py-2 cursor-pointer font-semibold text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] transition-all duration-300 ">
                                    Intresseanmälan
                                </button>
                            </div>

                            {/* ADDRESS AND INCLUDED */}
                            <div className="">
                                <h2 className="mb-1 text-xl sm:text-2xl font-medium text-gray-900">{apartment.title}</h2>
                                <h3 className="mb-5 text-lg font-normal ">{apartment.city} {apartment.area && <span> - {apartment.area}</span>}</h3>
                                {/* INCUDED */}
                                <div className=''>
                                    <h3 className='mb-1 text-lg font-medium text-gray-900'>Ingår i hyran</h3>
                                    {/* <p dangerouslySetInnerHTML={{ __html: apartment.included.replace(/\n/g, '<br />') }}></p> */}
                                    <ul>
                                        {apartment.included.split("\n").map((item) => (
                                            <li key={item} className="flex items-center gap-3"><span className="text-[var(--primary-color)]"><FaCheck /></span> {item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* ABOUT APARTMENT AND SUROUNDING */}
                        <div className="mt-10 mb-10">
                            <div className="lg:grid lg:grid-cols-2 gap-10 space-y-10 lg:space-y-0">
                                {[
                                    { label: "Om hyresrätten", value: apartment.general_info },
                                    { label: "Omgivning", value: apartment.environment },
                                ].map((item) => (
                                    <div key={item.label} className=' lg:pt-5 lg:border-t-2 border-gray-200'>
                                        <h3 className='mb-1 text-lg font-medium text-gray-900'>{item.label}</h3>
                                        <p className="" dangerouslySetInnerHTML={{ __html: item.value.replace(/\n/g, '<br />') }}></p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* INTEREST FORM */}
                        {showInterestForm && (
                            <div ref={formRef}>
                                <InterestForm address={apartment.title} />
                            </div>
                        )}

                        {/* MAP */}
                        <h3 className='mb-2 text-lg font-medium text-gray-900'>Karta</h3>
                    </div>
                    <div className="max-w-[1200px] mx-auto md:px-8">
                        <iframe className="w-full h-[450px] md:rounded-lg md:shadow-lg"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?q=${makeAddressToMapUrl(apartment.address + " " + apartment.city)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}>
                        </iframe>
                    </div>
                </>
            )}
        </>
    )
}