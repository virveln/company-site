import { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useFetch from '../../services/useFetch';
import NotFound from '../../pages/NotFound';

import placeholderImg from '../../images/house-placeholder.jpg';

import { FaArrowRightLong } from "react-icons/fa6";
import { UnderlineLeftToRightEffect } from '../Effects';

export default function ApartmentCard() {
    const { data, loading, error } = useFetch('/api/apartments/');
    const [apartments, setApartments] = useState([]);

    function getThumbnailImage(images) {
        const thumbnailImage = images.find(image => image.is_thumbnail); // Find image with is_thumbnail === true
        return thumbnailImage ? thumbnailImage.image : null; // Return the thumbnail image URL or null if not found
    }

    // Get avalible apartments
    useEffect(() => {
        setApartments(data.filter(apartment => apartment.is_available === true))
    }, [data]);

    if (error) return <NotFound />;

    return (
        <>
            {!loading ? (
                <div className="grid gap-5 justify-center mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {apartments.map((apartment) => {
                        const thumbnailImage = getThumbnailImage(apartment.images);
                        return (
                            <Link to={`/lagenhet/${apartment.id}`} key={apartment.title} className="group flex flex-col justify-between bg-white border border-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <div>
                                    <img className="rounded-t-lg aspect-3/2 object-cover" src={thumbnailImage ? thumbnailImage : placeholderImg} alt="" />
                                    <div className="px-5 pt-5">
                                        <h3 className="text-xl font-medium tracking-tight text-gray-900 ">{apartment.title}</h3>
                                        <p className="mb-3 font-normal ">{apartment.city}</p>
                                    </div>
                                </div>
                                <div className='px-5 pb-5'>
                                    <div >
                                        <div className='flex gap-1 justify-between max-w-[300px] mb-3 '>
                                            {[
                                                { title: "Hyra", value: `${apartment.rent} kr/mån` },
                                                { isDivider: true },
                                                { title: "Antal rum", value: `${apartment.rooms} rok` },
                                                { isDivider: true },
                                                { title: "Yta", value: `${apartment.square_meter} kvm` }
                                            ].map((item, index) =>
                                                item.isDivider ? (
                                                    <div key={index} className="self-stretch border-l border-gray-200 " />
                                                ) : (
                                                    <div key={index}>
                                                        <h4 className="text-xs text-gray-500 uppercase">{item.title}</h4>
                                                        <p>{item.value}</p>
                                                    </div>
                                                )
                                            )}
                                        </div>

                                        <div className='flex justify-between items-end'>
                                            <div className=''>
                                                <h4 className='text-xs text-gray-500 uppercase'>Tillträde</h4>
                                                <p>{apartment.access}</p>
                                            </div>
                                            <p className='group relative flex items-center text-[var(--secondary-color)] font-semibold hover:text-[var(--secondary-color-hover)] transition-colors duration-300'>
                                                Läs mer
                                                <FaArrowRightLong className="ml-2" />
                                                <UnderlineLeftToRightEffect color={'bg-[var(--secondary-color)]'} />                                    </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            ) : (

                <div className="grid gap-5 justify-center mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(1)].map((_, index) => (
                        <div
                            key={index}
                            role="status"
                            className="flex flex-col justify-between bg-white border border-gray-200 rounded-lg shadow-lg animate-pulse"
                        >
                            {/* Image Placeholder */}
                            <div className="w-full h-58 bg-gray-300 rounded-t-lg"></div>

                            {/* Content Placeholder */}
                            <div className="px-5 pt-5">
                                <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded-full w-1/2 mb-4"></div>
                            </div>

                            <div className="px-5 pb-5">
                                {/* Details */}
                                <div className="flex gap-1 justify-between mb-3 max-w-[300px]">
                                    {[...Array(3)].map((_, i) => (
                                        <Fragment key={i}>
                                            <div>
                                                <div className="h-2 bg-gray-200 rounded-full w-16 mb-1"></div>
                                                <div className="h-3 bg-gray-200 rounded-full w-12"></div>
                                            </div>
                                            {i < 2 && <div className="border-l border-gray-200 self-stretch"></div>}
                                        </Fragment>
                                    ))}
                                </div>

                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="h-2 bg-gray-200 rounded-full w-16 mb-1"></div>
                                        <div className="h-3 bg-gray-200 rounded-full w-20"></div>
                                    </div>

                                    {/* Read More Placeholder */}
                                    <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            )}

        </>
    )
}