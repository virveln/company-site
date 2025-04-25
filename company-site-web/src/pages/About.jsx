import TABTITLES from "../utils/tabTitles";
import PageHeader from "../components/layout/PageHeader";
import InformativeSection from "../components/layout/InformativeSection";

import exImage from '../assets/images/apartments.jpg';
import exImage1 from '../assets/images/apartment.jpg';

import { MdEco, MdOutlineSecurity } from "react-icons/md";
import { HiBadgeCheck } from "react-icons/hi";

const About = () => {
    return (
        <div>
            <title>{TABTITLES.ABOUT}</title>
            <PageHeader
                bgImage={exImage}
                heading={'Om bostadsportalen'}
                subHeading={'Vi skapar hållbara och trygga boendemiljöer med fokus på kvalitet och gemenskap.'}
            />
            <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-[-50px]">
                {/* FAST FACTS */}
                <div className=" flex justify-center ">
                    <div className="flex flex-wrap flex-col md:flex-row gap-x-10 gap-y-6 w-full lg:w-[80%] justify-between bg-neutral-50  px-10 py-5 p-5 rounded-lg shadow-md ">
                        {[
                            { label: 'Bildades', text: '2020' },
                            { label: 'Bostäder i förvaltning', text: '+150 st' },
                            { label: 'Vi finns', text: 'Karlstad med omnejd' },
                        ].map((fact) => (
                            <div key={fact.label} className='flex flex-col gap-2 '>
                                <h3 className="text-sm font-medium text-[var(--secondary-color)] uppercase">{fact.label}</h3>
                                <p className="text-lg font-semibold text-black">{fact.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* OUR HISTORY */}
                <div className="mt-20 flex flex-col md:flex-row md:gap-10 lg:gap-16 items-center">
                    <InformativeSection
                        label={'Vår historia'}
                        text={'Vi har över 20 års erfarenhet av fastighetsförvaltning och bostadsutveckling. Vår vision är att skapa hem där människor trivs och känner sig hemma.'}
                        image={exImage1}
                    />
                </div>

                {/* WHAT WE DO */}
                <div className="mt-20 flex flex-col md:flex-row-reverse md:gap-10 lg:gap-16 items-center">
                    <InformativeSection
                        label={'Vad vi gör'}
                        text={'Vi utvecklar, förvaltar och hyr ut bostäder och kommersiella fastigheter. Med fokus på hållbarhet och innovation skapar vi värde för både hyresgäster och samhället.'}
                        image={exImage1}
                    />
                </div>

                {/* VALUES */}
                <div className="mt-16">
                    {/* <h2 className="text-3xl font-semibold text-gray-900">Våra Värderingar</h2> */}
                    <div className="mt-8 grid md:grid-cols-3 gap-10 text-center">
                        {[
                            {
                                icon: <MdEco className="text-[#3FA0A9]" />,
                                title: "Hållbarhet",
                                description: "Vi bygger och förvaltar med miljön i fokus för en bättre framtid."
                            },
                            {
                                icon: <MdOutlineSecurity className="text-[var(--primary-color)]" />,
                                title: "Trygghet",
                                description: "Vi skapar boenden där människor kan känna sig säkra och hemma."
                            },
                            {
                                icon: <HiBadgeCheck className="text-yellow-600" />,
                                title: "Kvalitet",
                                description: "Vi strävar efter högsta kvalitet i allt vi gör – från service till byggnation."
                            }
                        ].map((value, index) => (
                            <div key={index} className="p-6 bg-neutral-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                <h3 className="inline-flex gap-3 items-center text-xl font-medium text-gray-800">
                                    {value.icon} {value.title}
                                </h3>
                                <p className="mt-3 text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;