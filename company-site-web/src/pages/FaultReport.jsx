import { useEffect, useState } from "react";
import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import useFetch from "../services/useFetch";

// const addresses = ["Adress 1", "Adress 2", "Adress 3"];
const categories = ["Felanmälan", "Besiktning", "Städning", "Övrigt"];
const classifications = ["Ingen", "Normal", "Brådskande", "Akut", "Åtgärdas"];

export default function FaultReport() {
    const { data } = useFetch('/api/apartments/');
    const [addresses, setAddresses] = useState([]);

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("Felanmälan skickad!");
    };

    
    // Fetch Addresses (title) for select option
    useEffect(() => {
        if (data && Array.isArray(data)) {
            setAddresses(data.map(apartment => apartment.address));
        }
        }, [data]);

    if (!addresses) return <p>Loading...</p>;

    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 my-10">
            <h1 className="text-4xl font-medium">Felanmälan</h1>
            <p>Välkommen till vår felanmälan! Här kan du snabbt och enkelt rapportera eventuella problem i din fastighet, såsom underhållsbehov, skador eller andra ärenden. Fyll i formuläret nedan så ser vi till att ditt ärende hanteras så snart som möjligt. Tack för din anmälan!</p>
            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10 border border-gray-200">
                <form onSubmit={handleSubmit} className="space-y-5">
                <p className="text-sm mb-3">Fält markerade med är <span className="text-red-500">*</span> obligatoriska</p>

                    {/* Adress */}
                    <div>
                        <label className="block text-gray-700 font-medium">Adress <span className="text-red-500">*</span></label>
                        <select name="address" value={formData.address} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Välj adress</option>
                            {addresses.map((addr, index) => (
                                <option key={index} value={addr}>{addr}</option>
                            ))}
                        </select>
                    </div>

                    {/* Kategori & Klassificering */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 font-medium">Kategori <span className="text-red-500">*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Välj kategori</option>
                                {categories.map((cat, index) => (
                                    <option key={index} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Klassificering <span className="text-red-500">*</span></label>
                            <select name="classification" value={formData.classification} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Välj klassificering</option>
                                {classifications.map((cls, index) => (
                                    <option key={index} value={cls}>{cls}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Namn, E-post & Telefon */}
                    <div className="grid md:grid-cols-3 gap-5">
                        <div>
                            <label className="block text-gray-700 font-medium">Namn <span className="text-red-500">*</span></label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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

                    {/* Rubrik */}
                    <div>
                        <label className="block text-gray-700 font-medium">Rubrik <span className="text-red-500">*</span></label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    {/* Beskrivning */}
                    <div>
                        <label className="block text-gray-700 font-medium">Beskrivning <span className="text-red-500">*</span></label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4"></textarea>
                    </div>

                    {/* Bilduppladdning */}
                    <div>
                        <label className="inline-flex text-gray-700 font-medium items-center gap-2">
                        <MdOutlinePermMedia />
                            Bifoga bilder
                        </label>
                        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full mt-2 p-3 border border-gray-300 rounded-lg cursor-pointer" />
                    </div>

                    {/* Bildförhandsvisning */}
                    {formData.images.length > 0 && (
                        <div className="mt-4">
                            <span className="text-gray-700 font-medium">Förhandsvisning:</span>
                            <div className="flex gap-2 mt-2 overflow-x-auto">
                                {formData.images.map((file, index) => (
                                    <img key={index} src={URL.createObjectURL(file)} alt="Uppladdad bild" className="w-16 h-16 object-cover rounded-md border shadow-md" />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skicka-knapp */}
                    <button type="submit" className="w-full flex items-center justify-center gap-2 cursor-pointer bg-[var(--secondary-color)] text-white py-3 px-6 rounded-lg hover:bg-[var(--secondary-color-hover)] transition-all">
                    <IoIosSend />
                    Skicka felanmälan
                    </button>
                </form>
            </div>
        </div>
    );
}
