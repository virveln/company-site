import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TenantSections from "./TenantSections";

const movingOutSections = [
    {
        title: "Uppsägning av hyreskontrakt",
        content:
            "Uppsägningstiden för din bostad är normalt <span class='font-semibold'>tre månader</span> och räknas från nästkommande månadsskifte efter att du har sagt upp kontraktet. Uppsägningen ska göras skriftligt och bekräftas av hyresvärden.",
    },
    {
        title: "Flyttstädning",
        content:
            "Lägenheten ska vara noggrant städad vid utflyttning. En besiktning kommer att genomföras för att säkerställa att lägenheten är i gott skick. Om städningen inte är godkänd kan du bli debiterad för extra städkostnader.",
    },
    {
        title: "Checklista vid utflytt",
        listContent: [
            "Boka tid för besiktning av lägenheten.",
            "Se till att flyttstädningen är ordentligt utförd.",
            "Återlämna samtliga nycklar senast kl. 12.00 på avflyttningsdagen.",
            "Meddela din nya adress till myndigheter och tjänsteleverantörer.",
        ],
    },
    {
        link:
        {
            title: "",
            contentBefore: "Har du frågor om din utflytt?",
            linkText: "Kontakta oss",
            linkUrl: `/${URL_ENDPOINTS.CONTACT}`,
            contentAfter: "så hjälper vi dig!"
        }
    }
];

export default function MovingOutSection() {

    return (
        <>
            <title>{TABTITLES.MOVING_OUT}</title>
            <TenantSections sections={movingOutSections} />
        </>
    )
};