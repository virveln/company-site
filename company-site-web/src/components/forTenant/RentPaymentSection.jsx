import TABTITLES from "../../utils/tabTitles";
import URL_ENDPOINTS from "../../utils/urlEndpoints";
import TenantSections from "./TenantSections";

const paymentSections = [
    {
        title: "Betalningsalternativ",
        listContent: [
            "Autogiro – Smidigast och säkrast. Hyran dras automatiskt varje månad.",
            "E-faktura – Få fakturan digitalt direkt i din internetbank.",
            "Bankgiro – Betala hyran manuellt via bankgiro-nummer.",
        ],
    },
    {
        title: "Förfallodatum",
        content: "Hyran ska betalas i förskott och vara oss tillhanda senast den <span class='font-semibold'>sista vardagen i varje månad</span>. Vid sen betalning kan påminnelseavgifter och andra avgifter tillkomma.",
    },
    {
        title: "Om du har svårt att betala hyran",
        content: "Om du får ekonomiska svårigheter är det viktigt att du kontaktar oss så snart som möjligt. Vi kan tillsammans hitta en lösning, exempelvis en avbetalningsplan.",
    },
    {
        link:
        {
            title: "",
            contentBefore: "Har du frågor om din hyresbetalning?",
            linkText: "Kontakta oss",
            linkUrl: `/${URL_ENDPOINTS.CONTACT}`,
            contentAfter: "så hjälper vi dig!"
        }
    }
];

export default function RentPaymentSection() {

    return (
        <>
            <title>{TABTITLES.RENT_PAYMENT}</title>
            <TenantSections sections={paymentSections} />
        </>

        // <div className="space-y-8  max-w-[600px]">
        //     <div>
        //         <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">Betalningsalternativ</h2>
        //         <ul className="list-disc pl-6 ">
        //             <li>Autogiro – Smidigast och säkrast. Hyran dras automatiskt varje månad.</li>
        //             <li>E-faktura – Få fakturan digitalt direkt i din internetbank.</li>
        //             <li>Bankgiro – Betala hyran manuellt via bankgiro-nummer.</li>
        //         </ul>
        //     </div>

        //     <div>
        //         <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">Förfallodatum</h2>
        //         <p className="">
        //             Hyran ska betalas i förskott och vara oss tillhanda senast den <span className="font-semibold">sista vardagen i varje månad</span>. Vid sen betalning kan påminnelseavgifter och andra avgifter tillkomma.
        //         </p>
        //     </div>

        //     <div>
        //         <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mb-2">Om du har svårt att betala hyran</h2>
        //         <p className="">
        //             Om du får ekonomiska svårigheter är det viktigt att du kontaktar oss så snart som möjligt. Vi kan tillsammans hitta en lösning, exempelvis en avbetalningsplan.
        //         </p>
        //     </div>

        //     <p className="">
        //         Har du frågor om din hyresbetalning? <Link to={`/${URL_ENDPOINTS.CONTACT}`} className="text-[var(--primary-color)] underline underline-offset-3 decoration-[var(--primary-color)]  hover:decoration-2">Kontakta oss</Link> så hjälper vi dig gärna!
        //     </p>
        // </div>
    )
};