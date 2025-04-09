import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import PropTypes from 'prop-types';


export default function InterestForm({ address }) {
    const [hasPets, setHasPets] = useState(false);
    const [coApplicant, setCoApplicant] = useState(false);

    const [formData, setFormData] = useState({
        address: "",
        category: "",
        classification: "",
        name: "",
        email: "",
        phone: "",
        title: "",
        description: "",
        images: [],
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Intresseanmälan skickad!");
    };

    // const [isChecked, setIsChecked] = useState(false);

    // const handleCheckboxChange = (event) => {
    //   setIsChecked(event.target.checked);
    // };

    return (
        <div className="max-w-3xl mx-auto mb-10 p-8 bg-white shadow-lg rounded-lg mt-10 border border-gray-200">
            <h2 className="mb-2 text-lg sm:text-2xl font-medium text-gray-900">Intresseanmälan för {address}</h2>
            <p className="text-sm mb-5">Fält markerade med <span className="text-red-500">*</span> är obligatoriska.</p>
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Namn, E-post & Telefon */}
                <div className="grid md:grid-cols-2 md:grid-rows-2 gap-5">
                    <div>
                        <label className="block text-gray-700 font-medium">Förnamn <span className="text-red-500">*</span></label>
                        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required className="peer w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none " />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Efternamn <span className="text-red-500">*</span></label>
                        <input type="text" name="surname" value={formData.surname} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">E-post <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Telefonnummer <span className="text-red-500">*</span></label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                </div>

                {/* Rökning */}
                <div>
                    <p className="block text-gray-700 font-medium">Rökare <span className="text-red-500">*</span></p>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="smoking" value="no" className="hidden peer" onChange={handleChange} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Nej</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="smoking" value="yes" className="hidden peer" onChange={handleChange} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Ja</span>
                        </label>
                    </div>
                </div>


                {/* Husdjur */}
                <div>
                    <label className="block text-gray-700 font-medium">Husdjur <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="pets" value="no" className="hidden peer" onChange={() => { handleChange; setHasPets(false); }} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Nej</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="pets" value="yes" className="hidden peer" onChange={() => { handleChange; setHasPets(true); }} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Ja</span>
                        </label>
                    </div>
                    {hasPets && (
                        <div>
                            <p className="mt-2 text-sm">Ange vilket husdjur ni har och antal</p>
                            <input type="text" name="pets" value={formData.pets} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    )}
                </div>

                {/* Medsökande */}
                <div>
                    <label className="block text-gray-700 font-medium">Medsökande <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="coApplicant" value="no" className="hidden peer" onChange={() => { handleChange; setCoApplicant(false); }} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Nej</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="radio" name="coApplicant" value="yes" className="hidden peer" onChange={() => { handleChange; setCoApplicant(true); }} />
                            <div className="w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-blue-700 peer-checked:bg-blue-500 transition-all duration-300 group-hover:border-blue-400">
                                <div className="w-2.5 h-2.5 bg-white rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                            </div>
                            <span className="text-gray-700 group-hover:text-blue-500 transition-colors">Ja</span>
                        </label>
                    </div>
                    {coApplicant && (
                        <div>
                            <p className="mt-2 text-sm">Är ni fler som som vill bo i lägenheten. Skriv in namn och kontaktuppgifter på hen i detta fält.</p>
                            <textarea type="text" name="coApplicant" value={formData.coApplicant} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="2"></textarea>
                            {/* <div className="grid md:grid-cols-2 md:grid-rows-2 gap-5">
                                <div>
                                    <label className="block text-gray-700 font-medium">Förnamn medsökande <span className="text-red-500">*</span></label>
                                    <input type="text" name="coApplicantFirstname" value={formData.coApplicantFirstname} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Efternamn medsökande <span className="text-red-500">*</span></label>
                                    <input type="text" name="coApplicantSurname" value={formData.coApplicantSurname} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">E-post medsökande <span className="text-red-500">*</span></label>
                                    <input type="email" name="coApplicantEmail" value={formData.coApplicantEmail} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">Telefonnummer medsökande <span className="text-red-500">*</span></label>
                                    <input type="tel" name="coApplicantPhone" value={formData.coApplicantPhone} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div> */}
                        </div>
                    )}
                </div>

                {/* Beskrivning */}
                <div>
                    <label className="block text-gray-700 font-medium">Kommentar / Frågor</label>
                    <textarea name="comment" value={formData.comment} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4"></textarea>
                </div>

                {/* Godkännande */}
                <div>
                    <div className="mb-4 flex">
                        <label className=" ">
                            <input
                                type="checkbox"
                                name="acceptTerms"
                                checked={formData.acceptTerms}
                                onChange={handleChange}
                                className="w-6 h-6 mr-2 border-2 border-gray-400 rounded-sm checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                            />
                        </label>
                        <span className="">

                            Jag godkänner Bostadsportalens
                            <a href="/terms" className="mx-1 text-blue-500 hover:underline">
                                integritetspolicy
                            </a>och att kreditupplysning kan komma att genomföras. <span className="text-red-500">*</span>
                        </span>
                    </div>

                </div>


                {/* Skicka-knapp */}
                <button type="submit" className=" flex items-center justify-center gap-2 w-full py-3 px-6 text-white font-semibold cursor-pointer bg-[var(--secondary-color)] rounded-lg hover:bg-[var(--secondary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] transition-all duration-300">
                    <IoIosSend />
                    Skicka intresseanmälan
                </button>
            </form>
        </div>
    );
}

InterestForm.propTypes = {
    address: PropTypes.string.isRequired,
};