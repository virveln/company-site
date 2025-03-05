import contactDetails from "../utils/contactDetails";
import { CgDanger } from "react-icons/cg";
import { FiTool } from "react-icons/fi";
import { IoMailOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import URL_ENDPOINTS from "../utils/urlEndpoints";

const Contact = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 my-10">
            <h1 className="text-4xl font-medium">Kontakt</h1>

            <div className="flex flex-wrap md:flex-nowrap gap-10 my-10  justify-center max-w-[1200px] mx-auto">

                <div className="p-6 min-h-[150px] w-full border border-gray-200 rounded-lg shadow-sm bg-[var(--gray-color)] flex flex-col justify-between">
                    <CgDanger className="text-2xl mb-5" />
                    <div>
                        <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900">Akuta ärenden</h2>
                        <h3 className=" font-normal ">Ring alltid <a href={`tel:${contactDetails.emergencyNbr}`} className="font-medium hover:underline">{contactDetails.emergencyNbr}</a></h3>
                    </div>
                </div>

                <div className="p-6 min-h-[150px] w-full border border-gray-200 rounded-lg shadow-sm bg-[var(--gray-color)] flex flex-col justify-between">
                    <FiTool className="text-2xl mb-5" />
                    <div>
                        <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900">Anmäla ett fel</h2>
                        <h3 className=" font-normal ">
                            Fyll i en 
                            <Link to={URL_ENDPOINTS.FAULT_REPORT}
                                className="mx-1 hover:underline font-medium">
                                Felanmälan 
                            </Link>
                            eller ring <a href={`tel:${contactDetails.telNbr}`} className="font-medium hover:underline">{contactDetails.telNbr}</a></h3>
                    </div>
                </div>

                <div className="p-6 min-h-[150px] w-full border border-gray-200 rounded-lg shadow-sm bg-[var(--gray-color)] flex flex-col justify-between">
                    <IoMailOutline className="text-2xl mb-5" />
                    <div>
                        <h2 className="mb-2 text-xl font-medium tracking-tight text-gray-900">Mejla oss</h2>
                        <h3 className=" font-normal ">Du kan skicka e-post till oss dygnet runt på <a href={`mailto:${contactDetails.mail}`} className="font-medium hover:underline">{contactDetails.mail}</a>. Vi läser alla inkommande mejl på helgfria vardagar mellan kl.08-17</h3>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Contact;