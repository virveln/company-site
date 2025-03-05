import { useParams } from "react-router-dom";
// import bild from '../images/apartment.jpg';
import { useState, useEffect, useRef } from "react";
import API from '../services/api-service';
import PhotoGallery from './ApartmentPhotoGallery';
import { Link } from "react-router-dom";
import InterestForm from "./InterestForm";

export default function ApartmentDetails() {
    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const formRef = useRef(null);
    const [showInterestForm, setShowInterestForm] = useState(false);
    // const apartment = dataTest.find(a => formatTitleForUrl(a.address) === apartmentAddress);

    useEffect(() => {
        async function fetchApartment() {
            const data = await API.getApartment(id);
            setApartment(data);
        }
        fetchApartment();
    }, [id]);

    function makeAddressToUrl(address) {
        console.log(address);
        return address.replace(/ /g, "+");
    }

    const handleFormButtonClick = () => {
        setShowInterestForm(prev => !prev);
    
        setTimeout(() => {
            if (formRef.current) {
                const yOffset = -110;
                const yPosition = formRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({ top: yPosition, behavior: "smooth"});
                // formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
    };
    


    if (!apartment) return <p>Loading...</p>;

    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-4 mb-10">

            {/* Breadcrumbs */}
            <nav className="text-sm mb-4">
                <ul className="flex space-x-2 text-gray-600">
                    <li>
                        <Link to="/" className="hover:underline">Hem</Link>
                    </li>
                    <li>/</li>
                    <li>
                        <Link to="/lediga-lagenheter/" className="hover:underline">Lediga lägenheter</Link>
                    </li>
                    <li>/</li>
                    <li className="text-gray-500">{apartment.title}</li>
                </ul>
            </nav>


            <div className="mt-5">
                <div className="flex justify-between  mb-2">
                    <div className="">
                        <h1 className="inline-flex text-4xl">{apartment.title}, {apartment.city}</h1>
                        {/* <span className='border-r border-gray-300' /> */}
                        {/* <h2 className="inline-flex text-xl ml-2 ">{apartment.city}</h2> */}
                    </div>
                    <button onClick={() => handleFormButtonClick()} className="hidden md:block text-center px-3 py-2 h-fit cursor-pointer text-sm font-medium text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        Intresseanmälan
                    </button>
                </div>
                {/* On phones */}
                <div className="md:hidden fixed bottom-0 left-0 z-1000 w-full p-5 bg-[var(--primary-color)] flex justify-between items-center">
                    <div className="">
                        <h1 className="inline-flex font-bold text-white">{apartment.title}, {apartment.city}</h1>
                        {/* <span className='border-r border-gray-300' /> */}
                        {/* <h2 className="inline-flex text-xl ml-2 ">{apartment.city}</h2> */}
                    </div>
                    <button onClick={() => handleFormButtonClick()} className="text-center px-3 py-2 h-fit cursor-pointer text-sm font-medium text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                        Intresseanmälan
                    </button>
                </div>

                <PhotoGallery />

                <div className="flex flex-col md:flex-row-reverse gap-5 my-10  ">
                    {/* <aside className="z-[99] mb-xl w-full lg:mb-[20px] lg:ml-auto lg:mt-[-100px] flex items-start justify-end lg:max-w-[40%] lg:pr-xl border border-gray-200 rounded-lg shadow-sm"> */}
                    {/* <div className="sticky flex flex-col gap-sm text-xs md:text-sm top-[180px] w-full rounded-[18px] bg-white p-[20px] lg:max-w-[420px]"> */}
                    <div className="flex flex-col gap-sm bg-white p-[20px] border border-gray-200 rounded-lg shadow-sm md:w-[50%] h-fit">
                        <div className='grid grid-cols-[auto_auto_auto_auto_auto] grid-rows-2 gap-5 justify-between mb-3 max-w-[400px]'>
                            <div className="">
                                <h3 className='text-sm text-gray-500'>Hyra</h3>
                                <h4>{apartment.rent} kr/mån</h4>
                            </div>
                            <span className='border-l border-gray-300' />
                            <div className='col-span-3'>
                                <h3 className='text-sm text-gray-500'>Tillträde</h3>
                                <h4>{apartment.access}</h4>
                            </div>
                            <div className='row-start-2'>
                                <h3 className='text-sm text-gray-500'>Antal rum</h3>
                                <h4>{apartment.rooms} rok</h4>
                            </div>
                            <span className='row-start-2 border-l border-gray-300' />
                            <div className='row-start-2'>
                                <h3 className='text-sm text-gray-500'>Yta</h3>
                                <h4>{apartment.square_meter} kvm</h4>
                            </div>
                            <span className='row-start-2 border-l border-gray-300' />

                            <div className='row-start-2'>
                                <h3 className='text-sm text-gray-500'>Våning</h3>
                                <h4>{apartment.floor_level}</h4>
                            </div>


                        </div>

                        <button onClick={() => handleFormButtonClick()} className="text-center px-3 py-2 cursor-pointer text-sm font-medium text-white bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            Intresseanmälan
                        </button>
                    </div>
                    {/* </aside> */}

                    <div className="md:w-[50%]">
                        <h2 className="text-2xl font-bold">{apartment.title}</h2>
                        <h3 className="mb-3 font-normal text-gray-700">{apartment.city}</h3>

                        <div className='mb-5'>
                            <h3 className='font-bold'>Om hyresrätten</h3>
                            <p dangerouslySetInnerHTML={{ __html: apartment.general_info.replace(/\n/g, '<br />') }}></p>
                        </div>
                        <div className='mb-5'>
                            <h3 className='font-bold'>Ingår i hyran</h3>
                            <p>{apartment.included}</p>
                        </div>
                        <div className=''>
                            <h3 className='font-bold'>Omgivning</h3>
                            <p>{apartment.environment}</p>
                        </div>
                    </div>

                </div>

                {showInterestForm && (
                    <div ref={formRef}>
                    <InterestForm />
                    </div>
                )}
                <h3 className='font-bold'>Karta</h3>
                <iframe className="w-full h-[450px] rounded-lg"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?q=${makeAddressToUrl(apartment.address + " " + apartment.city)}&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8`}>
                </iframe>
            </div>
        </div>
    )
}