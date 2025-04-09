import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import useFetch from "../services/useFetch";
import { formatDate, formatTitleForUrl } from "../utils/functions";
import { UnderlineLeftToRightEffect } from './Effects';

import { FaArrowRightLong } from "react-icons/fa6";

export default function InfoTenantCard({ limit }) {
    const { data, loading } = useFetch('/api/information/');
    const [information, setInformation] = useState([]);

    // Get information cards
    useEffect(() => {
        setInformation(data.filter(apartment => apartment.is_showing === true))
    }, [data]);

    return (
        <>
            {!loading ? (
                <>
                    {information
                        .slice(0, limit)
                        .map((info) => {
                            return (
                                <Link key={info.title} to={`/hyresgast/information/${formatTitleForUrl(info.title)}`} className="group flex flex-col justify-between p-6 bg-neutral-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer">
                                    <div className="mb-5">
                                        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-3">{info.title}</h3>
                                        <p className="">{info.description.slice(0, 200)}...</p>
                                    </div>

                                    <div className="flex items-center justify-between  font-semibold">
                                        <p className="text-gray-500 text-sm">{formatDate(info.created_at)}</p>
                                        <p
                                            // to={`/hyresgast/information/${formatTitleForUrl(info.title)}`}
                                            className="group relative inline-flex items-center text-[var(--secondary-color)] hover:text-[var(--secondary-color-hover)] transition-colors duration-300">
                                            Läs mer
                                            <FaArrowRightLong className="ml-2" />
                                            <UnderlineLeftToRightEffect color={'bg-[var(--secondary-color)]'} />
                                        </p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    {/* </div> */}
                </>
            ) : (
                <div role="status" className="flex flex-col justify-between p-6 w-full flex-grow bg-neutral-50 rounded-lg shadow-lg animate-pulse" >
                    <div className="mb-5">
                        <div className="h-5 bg-gray-200 rounded-full w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-full mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-5/6 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-4/5"></div>
                    </div>

                    <div className="flex items-center justify-between font-semibold">
                        <div className="h-3 bg-gray-200 rounded-full w-16"></div>
                        <div className="h-4 bg-gray-200 rounded-full w-20"></div>
                    </div>
                </div>
            )}
        </>
    )
}

InfoTenantCard.propTypes = {
    limit: PropTypes.number,
};