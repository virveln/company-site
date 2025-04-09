import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TenantSections from "./TenantSections";

const neighborsContent = [
    {
        title: "Visa hänsyn",
        listContent: [
            "Håll ljudnivån låg på kvällar och nätter (efter kl. 22.00).",
            "Undvik att spela hög musik eller borra sent på kvällen.",
            "Tänk på att samtal i trapphuset och på balkonger kan höras tydligt.",
        ],
    },
    {
        title: "Gemensamma utrymmen",
        listContent: [
            "Håll entréer, trapphus och tvättstugor rena och fria från skräp.",
            "Respektera bokade tider i tvättstugan och städa efter dig.",
            "Låt inte cyklar, barnvagnar eller andra föremål stå i vägen.",
        ],
    },
    {
        title: "Husdjur",
        content: "Om du har husdjur, se till att de inte stör grannarna och att du plockar upp efter dem utomhus.",
    },
    {
        link:
        {
            title: "Om du har problem",
            contentBefore: "Om du upplever problem med en granne, försök att prata med personen i första hand. Om det inte hjälper kan du",
            linkText: "kontakta oss",
            linkUrl: `/${URL_ENDPOINTS.CONTACT}`,
            contentAfter: "så hjälper vi dig!"
        }
    }
];

export default function NeighborsSection() {
    return (
        <>
            <title>{TABTITLES.NEIGHBORS}</title>
            <TenantSections sections={neighborsContent} />
        </>
    )
};