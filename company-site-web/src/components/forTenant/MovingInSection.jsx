import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TenantSections from "./TenantSections";

const movinInContent = [
    {
        title: "När får du tillgång till din lägenhet?",
        content: " Du kan hämta ut dina nycklar från <span class='font-semibold'>kl. 12.00 på tillträdesdagen</span>, som oftast är den första dagen i månaden. Om inflyttningsdagen infaller på en helg eller röd dag, kan du hämta nycklarna nästkommande vardag.",
    },
    {
        title: "Checklista vid inflyttning",
        listContent: [
            "Hämta dina nycklar hos din fastighetsvärd.",
            "Kontrollera lägenheten och meddela eventuella brister.",
            "Teckna elavtal och hemförsäkring.",
            "Adressändra hos Skatteverket och beställ eftersändning av post.",
        ],
    },
    {
        link:
        {
            title: "Felanmälan och kontakt",
            type: "p",
            contentBefore: "Om du upptäcker något fel i lägenheten vid inflyttning kan du göra en",
            linkText: "felanmälan",
            linkUrl: `/${URL_ENDPOINTS.FAULT_REPORT}`,
            contentAfter: "så åtgärdar vi det så snart som möjligt."
        }
    }
];

export default function MovingInSection() {

    return (
        <>
            <title>{TABTITLES.MOVING_IN}</title>
            <TenantSections sections={movinInContent} />
        </>
    )
};