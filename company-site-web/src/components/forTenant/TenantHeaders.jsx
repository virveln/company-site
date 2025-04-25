import URL_ENDPOINTS from '../../utils/urlEndpoints';
import exImage from '../../assets/images/apartments.jpg';
import toolImg from '../../assets/images/tool.jpg';
import movingImg from '../../assets/images/moving.jpg';
import paymentImg from '../../assets/images/payment.jpg';
import keysImg from '../../assets/images/keys.jpg';
import cleaningImg from '../../assets/images/cleaning.jpg';

const TenantSectionHeaders = [
    { 
        path: [URL_ENDPOINTS.FOR_TENANT], 
        bgImage: exImage, 
        heading: 'För dig som hyresgäst', 
        subHeading: 'Tack för att du hyr av bostadsportalen! Här hittar du all info som du behöver under din tid som hyresgäst hos oss.' 
    },
    { 
        path: [URL_ENDPOINTS.INFORMATION], 
        bgImage: exImage, 
        heading: 'Information till hyresgäster', 
        subHeading: 'Här hittar du den senaste informationen som kan påverka dig som hyresgäst. Vi uppdaterar löpande med viktiga meddelanden om underhållsarbeten, förändringar i fastigheten och annan nyttig information.' 
    },
    { 
        path: [URL_ENDPOINTS.FAULT_REPORT], 
        bgImage: toolImg, 
        heading: 'Felanmälan', 
        subHeading: 'Välkommen till vår felanmälan! Här kan du snabbt och enkelt rapportera eventuella problem i din fastighet, såsom underhållsbehov, skador eller andra ärenden. Fyll i formuläret nedan så ser vi till att ditt ärende hanteras så snart som möjligt. Tack för din anmälan!' 
    },
    { 
        path: [URL_ENDPOINTS.RENTAL_POLICY], 
        bgImage: keysImg, 
        heading: 'Uthyrningspolicy', 
        subHeading: 'För att skapa en trygg och rättvis bostadsmarknad har vi en tydlig uthyrningspolicy. Vår målsättning är att erbjuda bostäder till hyresgäster som uppfyller våra krav och bidrar till en trivsam boendemiljö.' 
    },
    { 
        path: [URL_ENDPOINTS.RENT_PAYMENT], 
        bgImage: paymentImg, 
        heading: 'Hyresinbetalningar', 
        subHeading: 'Att betala hyran i tid är en viktig del av ditt boende. Här hittar du information om hur och när hyran ska betalas, samt vad du kan göra om du får problem med betalningen.' 
    },
    { 
        path: [URL_ENDPOINTS.MOVING_IN], 
        bgImage: movingImg, 
        heading: 'För dig som ska flytta in', 
        subHeading: 'Välkommen till din nya bostad! Här hittar du viktig information om vad du behöver tänka på inför och under din inflyttning.' 
    },
    { 
        path: [URL_ENDPOINTS.MOVING_OUT], 
        bgImage: movingImg, 
        heading: 'För dig som ska flytta ut', 
        subHeading: 'Dags att flytta? Här får du all information du behöver om hur utflyttningen går till och vad du behöver tänka på.' 
    },
    { 
        path: [URL_ENDPOINTS.HOME_MAINTENANCE], 
        bgImage: cleaningImg, 
        heading: 'Skötsel av bostaden', 
        subHeading: 'Att ta hand om din bostad är viktigt för att den ska vara trivsam och i gott skick. Här hittar du några enkla tips för hur du kan sköta din bostad på bästa sätt.' 
    },
    { 
        path: [URL_ENDPOINTS.NEIGHBORS], 
        bgImage: exImage, 
        heading: 'Du och dina grannar i en trivsam miljö', 
        subHeading: 'Ett trevligt boende skapas tillsammans! Här är några enkla riktlinjer för att skapa en trygg och trivsam miljö för alla i fastigheten.'
    },
];

export default TenantSectionHeaders;
