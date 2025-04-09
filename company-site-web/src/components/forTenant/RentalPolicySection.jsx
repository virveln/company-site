// import { Link } from "react-router-dom";
import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TenantSections from "./TenantSections";

const rentalPolicyContent = [
    {
        title: "Grundkrav för att hyra bostad",
        listContent: [
            "Du måste vara minst 18 år gammal.",
            "Du ska ha en fast inkomst som täcker hyran.",
            "Vi gör en kreditupplysning – skulder eller betalningsanmärkningar kan påverka möjligheten att hyra.",
            "Du får inte ha störningsanmärkningar från tidigare boenden.",
        ],
    },
    {
        title: "Ansökningsprocessen",
        content: "När du hittar en ledig bostad som passar dig, gör du en intresseanmälan via vår webbplats. Därefter går vi igenom inkomna ansökningar och kontaktar de sökande som bäst matchar våra uthyrningskrav."
    },
    {
        title: "Kontrakt och inflyttning",
        content: "Om du blir erbjuden en bostad skickar vi ut ett kontrakt som ska undertecknas. Vi går även igenom viktiga regler och trivselriktlinjer innan du får tillgång till ditt nya hem.",
    },
    {
        link:
        {
            title: "",
            contentBefore: "Har du frågor om vår uthyrningspolicy?",
            linkText: "Kontakta oss",
            linkUrl: `/${URL_ENDPOINTS.CONTACT}`,
            contentAfter: "så hjälper vi dig!"
        }
    }
];

export default function RentalPolicySection() {
    return (
        <>
            <title>{TABTITLES.RENTAL_POLICY}</title>
            <TenantSections sections={rentalPolicyContent} />
        </>
    )
};