import { useEffect, useState } from "react";
import VacantApartments from "../components/ApartmentCard";
import useFetch from "../services/useFetch";

const Apartments = () => {
    const { data } = useFetch('/api/apartments/');
    const [availableApartments, setAvailableApartments] = useState([]);


    useEffect(() => {
        setAvailableApartments(data.filter(apartment => apartment.is_available === true).length)
    }, [data]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 my-10">
            <h1 className="text-4xl font-medium">Lediga lägenheter</h1>
            <p>Upptäck våra lediga lägenheter och hitta ditt nya hem.</p>
            <p>{availableApartments} st lediga lägenheter just nu.</p>
            {availableApartments > 0 ? (
                <VacantApartments />
            ) :
            (
                <div className="text-center py-10">
                    <h2 className="text-2xl font-semibold text-gray-800">Inga lediga lägenheter just nu</h2>
                    <p className="mt-4 text-gray-600">För närvarande finns det inga lediga lägenheter. Vi uppdaterar regelbundet, så kika gärna tillbaka senare!</p>
                    <div className="mt-6">
                        
                    </div>
                </div>
            )}
        </div>
    );
};

export default Apartments;