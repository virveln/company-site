
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatTitleForUrl } from "../../utils/functions";
import API from "../../services/api-service";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import Breadcrumbs from "../Breadcrumbs";
import { formatDate } from "../../utils/functions";
import TABTITLES from "../../utils/tabTitles";
import NotFound from "../../pages/NotFound";

export default function InfoDetailed() {
    const { title } = useParams();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // Get selected info card (based on id, but using title in url)
    useEffect(() => {
        async function fetchInformation() {
            try {
                const allInfo = await API.fetchInformation();
                const matchedInfo = allInfo.find(item => formatTitleForUrl(item.title) === title);

                if (matchedInfo) {
                    const data = await API.getInformation(matchedInfo.id);
                    if (!data) throw new Error("Not found");
                    setInfo(data);
                }

            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchInformation();
    }, [title]);

    if (error) return <NotFound />;

    return (
        <>
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-4">
                {info && (
                    <>
                        <title>{`${info.title}${TABTITLES.INFORMATION_DETAILED}`}</title>
                        <Breadcrumbs
                            previousPages={[
                                { url: '/', label: 'Hem' },
                                { url: `/${URL_ENDPOINTS.FOR_TENANT}${URL_ENDPOINTS.INFORMATION}`, label: 'All information' }
                            ]}
                            currentPage={info.title}
                        />
                    </>
                )}
                {!loading ? (
                    <div className="max-w-[600px] mx-auto">
                        {/* Title & Description */}
                        <div className="">
                            <h1 className="mb-5 text-2xl font-medium text-gray-900 hover:text-[var(--primary-color-hover)] transition-colors duration-200">{info.title}</h1>
                            {info.image && (
                                <img src={info.image} alt="" className="mb-5 rounded-lg shadow-lg" />
                            )}
                            <p dangerouslySetInnerHTML={{ __html: info.description.replace(/\n/g, '<br />') }} className="text-gray-600 text-base"></p>
                            <p className="mt-10 text-xs font-semibold text-gray-500 pt-2 border-t-2 border-gray-200">{formatDate(info.created_at)}</p>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-[600px] mx-auto mt-18 animate-pulse">
                        <div className="h-6 w-3/4 bg-gray-300 rounded mb-5"></div>

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>

                        <div className="mt-10 pt-2 border-t-2 border-gray-200">
                            <div className="h-3 w-1/4 bg-gray-300 rounded"></div>
                        </div>
                    </div>

                )}
            </div>
        </>
    )
};