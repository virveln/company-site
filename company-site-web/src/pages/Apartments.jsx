import TABTITLES from "../utils/tabTitles";
import useFetch from "../services/useFetch";
import PageHeader from "../components/PageHeader";
import VacantApartments from "../components/apartments/ApartmentCard";
import Loading from "../components/Loading";
import NotFound from "./NotFound";

const Apartments = () => {
    const { data, loading, error } = useFetch('/api/apartments/');

    // if (!loading) { return (<div className="relative"><Loading /> </div>); }

    const availableApartments = data.filter(apartment => apartment.is_available).length;

    if (error) return <NotFound />;

    return (
        <>
            {!loading ? (
                <div>
                    <title>{TABTITLES.AVALIBLE_APARTMENTS}</title>
                    <PageHeader
                        // bgImage={bgImg}
                        heading={'Lediga lägenheter'}
                        subHeading={'Letar du efter en ny bostad? Här listar vi våra lediga lägenheter. Kontakta oss gärna om du har frågor eller vill boka en visning!'}
                    />
                    <div className="max-w-[1200px] mx-auto px-5 md:px-8 pt-5 mt-[-120px]">
                        <p className="mb-5 text-white font-medium tracking-wider [text-shadow:2px_2px_4px_rgba(0,0,0,0.3)]">
                            <span className="inline-flex items-center justify-center px-4 py-1.5  mr-2 rounded-xl bg-[var(--primary-color)] text-white  font-bold [text-shadow:0_0_0_rgba(0,0,0,0)]">
                                {availableApartments} st
                            </span>
                            lediga lägenheter just nu.
                        </p>
                        {availableApartments > 0 ? (
                            <VacantApartments />
                        ) : (
                            <div className="text-center pt-40 md:pb-10">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Inga lediga lägenheter just nu</h2>
                                <p className="mt-4 ">För närvarande finns det inga lediga lägenheter. Vi uppdaterar regelbundet, så kika gärna tillbaka senare!</p>
                                <div className="mt-6">

                                </div>
                            </div>
                        )}
                    </div>
                </div >
            ) : (
                <div className="relative min-h-[70vh]"><Loading /> </div>
            )}
        </>
    );
};

export default Apartments;