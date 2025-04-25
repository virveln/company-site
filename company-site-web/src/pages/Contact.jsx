import { Link } from "react-router-dom";

import URL_ENDPOINTS from "../utils/urlEndpoints";
import TABTITLES from "../utils/tabTitles";
import contactDetails from "../utils/contactDetails";
import PageHeader from "../components/layout/PageHeader";

import bgImg from '../assets/images/contact.jpg';
import { CgDanger } from "react-icons/cg";
import { FiTool } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";

const Contact = () => {
    return (
        <div>
            <title>{TABTITLES.CONTACT}</title>
            <PageHeader
                bgImage={bgImg}
                heading={'Kontakta oss'}
                subHeading={'Hos oss på bostadsportalen kan du känna dig trygg. Vi erbjuder en bra boendemiljö och vi finns här på plats för dig som hyresgäst med god service.'}
            />
            <div className="max-w-[1200px] mx-auto min-h-[300px] px-5 md:px-8 mt-[-50px]">
                
                {/* CONTACT INFO */}
                {/* <div className="flex flex-wrap lg:flex-nowrap gap-10 justify-center max-w-[1200px] mx-auto"> */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10  max-w-[1200px] mx-auto text-base/7 ">
                    {[
                        {
                            icon: <CgDanger />,
                            title: "Akuta ärenden",
                            content: (
                                <p>
                                    Ring alltid <a href={`tel:${contactDetails.emergencyNbr}`} className="underline underline-offset-3 decoration-[var(--primary-color)] hover:decoration-2">
                                        {contactDetails.emergencyNbr}
                                    </a>
                                </p>
                            ),
                        },
                        {
                            icon: <FiTool />,
                            title: "Anmäla ett fel",
                            content: (
                                <p>
                                    Gör en
                                    <Link to={`/${URL_ENDPOINTS.FOR_TENANT}${URL_ENDPOINTS.FAULT_REPORT}`} className="mx-1 font-medium underline underline-offset-3 decoration-[var(--primary-color)] hover:decoration-2">
                                        Felanmälan
                                    </Link>
                                    eller<br />
                                    ring <a href={`tel:${contactDetails.telNbr}`} className="underline underline-offset-3 decoration-[var(--primary-color)] hover:decoration-2">
                                        {contactDetails.telNbr}
                                    </a>
                                </p>
                            ),
                        },
                        {
                            icon: <IoMailOutline />,
                            title: "Mejla oss",
                            content: (
                                <p>
                                    Du kan skicka e-post till oss dygnet runt på <a href={`mailto:${contactDetails.mail}`} className="underline underline-offset-3 decoration-[var(--primary-color)] hover:decoration-2">
                                        {contactDetails.mail}
                                    </a>. Vi läser alla inkommande mejl på helgfria vardagar mellan kl.08-17.
                                </p>
                            ),
                        },
                    ].map((option, index) => (
                        <div key={index} className="p-6 min-h-[180px] md:min-h-[220px] w-full bg-neutral-50 rounded-lg shadow-md flex flex-col justify-between">
                            <span className="text-3xl mb-5 text-[var(--secondary-color)]">{option.icon}</span>
                            <div>
                                <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900">{option.title}</h2>
                                {option.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Contact;