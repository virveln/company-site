import { Outlet, useLocation } from "react-router-dom"
import URL_ENDPOINTS from "../utils/urlEndpoints";
import TABTITLES from "../utils/tabTitles";
import PageHeader from "../components/PageHeader"
import TenantHeader from '../components/forTenant/TenantHeaders';
import TenantSubmenu from "../components/forTenant/TenantSubmenu"

import exImage from '../images/apartments.jpg';

export default function ForTenant() {
    // Get last part of url
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const lastPathSegment = pathParts[pathParts.length - 1];

    // Get headers, if not use default
    const matchingSection = TenantHeader.find(section => section.path.includes(lastPathSegment));
    const headerData = matchingSection || { bgImage: exImage, heading: 'För dig som hyresgäst', subHeading: 'Tack för att du hyr av bostadsportalen! Här hittar du all info som du behöver under din tid som hyresgäst hos oss.' };

    // If default use default text as below
    const isDefaultTenantPath = (location.pathname).replace(/\//g, '') === (URL_ENDPOINTS.FOR_TENANT).replace(/\//g, '');

    return (
        <div>
            <title>{TABTITLES.FOR_TENANT}</title>
            <PageHeader
                bgImage={headerData.bgImage}
                heading={headerData.heading}
                subHeading={headerData.subHeading}
            />
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 ">
                <div className="md:flex flex-column-reverse gap-5 justify-between relative md:mt-[20px]">
                    <TenantSubmenu />
                    <div className="flex-1 md:max-w-[800px]">
                        <div className="md:hidden mb-2">
                            <h1 className=" mb-5 text-2xl sm:text-4xl font-medium text-gray-900 ">{headerData.heading}</h1>
                            <p className="max-w-160 mt-4 mb-6 text-lg font-semibold text-gray-900">{headerData.subHeading}</p>
                        </div>
                        {isDefaultTenantPath ? (
                            <>
                                <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">All information du behöver</h2>
                                <p className=" md:max-w-150">Här hittar du viktig information och resurser som rör ditt boende. Oavsett om du har frågor om felanmälan, uthyrningspolicy, hyresinbetalningar eller behöver veta mer om inflyttning och utflyttning, har vi samlat allt du behöver på ett ställe. Utforska de olika sektionerna för att få svar på dina frågor och ta del av tips för en trivsam och trygg boendemiljö.</p>
                            </>
                        ) : (
                            <Outlet />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}