import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints"
import TenantSections from "./TenantSections";

const maintenanceContent = [
    {
        title: "Rengöring och underhåll",
        listContent: [
            "Rengör köksfläkten och ventiler regelbundet för att undvika brandrisk.",
            "Avkalka duschmunstycken och kranar för att förhindra stopp.",
            "Håll golvbrunnar rena för att undvika dålig lukt och vattenskador.",
            "Följ skötselråd för vitvaror och undvik att överbelasta dem.",
        ],
    },
    {
        title: "Värme, vatten och el",
        contentBefore: "För att minska energiförbrukningen och hålla bostaden i gott skick:",
        listContent: [
            "Håll element fria från möbler för att få optimal uppvärmning.",
            "Rapportera droppande kranar eller rinnande toaletter – det sparar både vatten och pengar.",
            "Byt lampor och säkringar vid behov.",
            "Använd miljövänliga rengöringsprodukter för en bättre inomhusmiljö.",
        ],
    },
    {
        link:
        {
            title: "Felanmälan",
            contentBefore: "Om du upptäcker något problem i din bostad kan du göra en",
            linkText: "felanmälan",
            linkUrl: `/${URL_ENDPOINTS.FAULT_REPORT}`,
            contentAfter: "så ser vi till att det åtgärdas så snart som möjligt."
        }
    }
];

export default function MaintenanceSection() {
    return (
        <>
            <title>{TABTITLES.HOME_MAINTENANCE}</title>
            <TenantSections sections={maintenanceContent} />
        </>
    )
};