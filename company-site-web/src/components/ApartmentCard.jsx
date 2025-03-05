import bild from '../images/apartment.jpg';
import { Link } from 'react-router-dom';
import useFetch from '../services/useFetch';
import { useEffect, useState } from 'react';

// const info = [
//     { title: 'Södra Kyrkogatan 7a', date: '2025-03-01', text: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...' },
//     { title: 'Kvintettgatan 6', date: '2025-02-25', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...' },
// ]

export default function ApartmentCard() {
    const { data, loading, error } = useFetch('/api/apartments/');
    const [apartments, setApartments] = useState([]);

    // function formatTitleForUrl(address) {
    //     return address.toLowerCase().replace(/ /g, '-').replace('å', 'a').replace('ä', 'a').replace('ö', 'o').replace(/[^a-z0-9-]/g, ''); // Konverterar till små bokstäver, ersätter mellanslag med bindestreck och tar bort specialtecken
    // }

    function getThumbnailImage(images) {
        const thumbnailImage = images.find(image => image.is_thumbnail); // Find image with is_thumbnail === true
        return thumbnailImage ? thumbnailImage.image : null; // Return the thumbnail image URL or null if not found
    }

    useEffect(() => {
        setApartments(data.filter(apartment => apartment.is_available === true))
    }, [data]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto justify-center">
            {apartments.map((apartment) => {
                const thumbnailImage = getThumbnailImage(apartment.images);
                return (
                    <Link to={`/lagenhet/${apartment.id}`} key={apartment.id} className=" bg-white border border-gray-200 rounded-lg shadow-sm ">
                        <img className="rounded-t-lg aspect-3/2 object-cover" src={thumbnailImage ? thumbnailImage : bild} alt="" />
                        <div className="p-5">
                            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{apartment.title}</h3>
                            <p className="mb-3 font-normal text-gray-700 ">{apartment.city}</p>
                            <div className='flex gap-1 justify-between mb-3 max-w-[300px]'>
                                <div>
                                    <h5 className='text-sm text-gray-500'>Hyra</h5>
                                    <h4>{apartment.rent} kr/mån</h4>
                                </div>
                                <div className='border-l border-gray-300' />
                                <div className=''>
                                    <h5 className='text-sm text-gray-500'>Antal rum</h5>
                                    <h4>{apartment.rooms} rok</h4>
                                </div>
                                <div className='border-l border-gray-300' />
                                <div className=''>
                                    <h5 className='text-sm text-gray-500'>Yta</h5>
                                    <h4>{apartment.square_meter} kvm</h4>
                                </div>
                            </div>
                            <div className='flex justify-between items-end'>
                                <div className=''>
                                    <h5 className='text-sm text-gray-500'>Tillträde</h5>
                                    <h4>{apartment.access}</h4>
                                </div>

                                <Link to={`/lagenhet/${apartment.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color-hover)] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                                    Läs mer om lägenheten
                                </Link>

                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}