import { useState } from "react";
import { IoIosSend } from "react-icons/io";


export default function InterestForm() {
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

    return (
        <div className="max-w-3xl mx-auto mb-10 p-8 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
            <h2 className="text-2xl font-medium">Intresseanmälan</h2>
            <p className="text-sm mb-3">Fält markerade med är <span className="text-red-500">*</span> obligatoriska</p>
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Namn, E-post & Telefon */}
                <div className="grid md:grid-cols-2 md:grid-rows-2 gap-5">
                    <div>
                        <label className="block text-gray-700 font-medium">Förnamn <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Efternamn <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={formData.surname} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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
                        </div>
                    )}
                </div>

                {/* Beskrivning */}
                <div>
                    <label className="block text-gray-700 font-medium">Kommentar / Frågor</label>
                    <textarea name="comment" value={formData.comment} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4"></textarea>
                </div>



                {/* Skicka-knapp */}
                <button type="submit" className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[var(--secondary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color-hover)] transition-all">
                    <IoIosSend />
                    Skicka Intresseanmälan
                </button>
            </form>
        </div>
    );
}
