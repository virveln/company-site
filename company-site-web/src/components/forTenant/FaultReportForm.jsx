import { useEffect, useRef, useState } from "react";

import useFetch from "../../services/useFetch";
import API from "../../services/api-service";
import FormModal from "../common/FormModal";

import { MdOutlinePermMedia } from "react-icons/md";
import { IoIosSend } from "react-icons/io";

const categories = ["Felanmälan", "Besiktning", "Städning", "Övrigt"];
const classifications = ["Ingen", "Normal", "Brådskande", "Akut", "Åtgärdas"];

export default function FaultReportForm() {
    const { data } = useFetch('/api/apartments/');
    const [sortedAddresses, setSortedAddresses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formIsSent, setFormIsSent] = useState(false);
    
    const formRef = useRef(null);
    const fileInputRef = useRef(null);

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

    // Fetch Addresses (title) for select option
    useEffect(() => {
        if (data && Array.isArray(data)) {
            const addresses = [...data.map(apartment => apartment.address), 'Annan adress'];
            setSortedAddresses(addresses.sort((a, b) => a.localeCompare(b)));
        }
    }, [data]); 

    // Handle images
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        setFormData((prevFormData) => ({
            ...prevFormData,
            images: [...prevFormData.images, ...files], // Append new images
        }));

        // Reset file input after selecting files
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // This resets the file input value
        }
    };

    // Delete images
    const handleDeleteImage = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            images: prevFormData.images.filter((_, i) => i !== index),
        }));
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('address', formData.address);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('classification', formData.classification);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phone', formData.phone);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);

        // Append images to the FormData object
        formData.images.forEach((image) => {
            formDataToSend.append('images', image);
        });

        const response = await API.setFaultReport(formDataToSend);
        setFormIsSent(response);
        setIsModalOpen(true);

        // Reset form when submitted
        if(formIsSent){
            setFormData({
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
        }

    };

    if (!sortedAddresses) return <p></p>;

    return (
        // <div className="max-w-[1200px] mx-auto px-5 md:px-8 my-10">
        <div className="max-w-[1200px] mx-auto my-10">
            <div className="p-8 bg-white shadow-lg rounded-lg border border-gray-100">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="mb-2 text-2xl font-medium text-gray-900">Felanmälan</h2>
                    <p className="text-sm mb-5">Fält markerade med <span className="text-red-500">*</span> är obligatoriska.</p>
                    {/* Adress */}
                    <div>
                        <label className="block text-gray-700 font-medium">Adress <span className="text-red-500">*</span></label>
                        <select name="address" value={formData.address} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                            <option value="">Välj adress</option>
                            {sortedAddresses.map((addr) => (
                                <option key={addr} value={addr}>{addr}</option>
                            ))}
                        </select>
                    </div>

                    {/* Kategori & Klassificering */}
                    <div className="grid md:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-gray-700 font-medium">Kategori <span className="text-red-500">*</span></label>
                            <select name="category" value={formData.category} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Välj kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium">Klassificering <span className="text-red-500">*</span></label>
                            <select name="classification" value={formData.classification} onChange={handleChange} required className="w-full mt-1 p-3 cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                <option value="">Välj klassificering</option>
                                {classifications.map((cls) => (
                                    <option key={cls} value={cls}>{cls}</option>
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
                            <input type="tel" name="phone" pattern="^\+?[0-9]{1,13}$" value={formData.phone} onChange={handleChange} required className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
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
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full min-h-30 mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" rows="4" ></textarea>
                    </div>

                    {/* Bilduppladdning */}
                    <div>
                        <label className="inline-flex text-gray-700 font-medium items-center gap-2">
                            <MdOutlinePermMedia />
                            Bifoga bilder
                        </label>

                        {/* Custom file input */}
                        <div className="relative mt-2">
                            <input
                                id="imageUpload"
                                type="file"
                                ref={fileInputRef}
                                name="images"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="imageUpload"
                                className="w-full block px-4 py-2  font-medium border border-gray-300 rounded-lg cursor-pointer ">
                                {formData.images.length > 0 ? `${formData.images.length} bild(er) vald` : "Välj bilder..."}
                            </label>
                        </div>
                    </div>

                    {/* Bildförhandsvisning */}
                    {formData.images.length > 0 && (
                        <div className="mt-4">
                            <span className="text-gray-700 font-medium">Förhandsvisning:</span>
                            <div className="flex gap-2 mt-2 overflow-x-auto">
                                {formData.images.map((file, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Uppladdad bild"
                                            className="w-16 h-16 object-cover rounded-md border shadow-md"
                                        />
                                        {/* Delete button */}
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteImage(index)}
                                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs cursor-pointer"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Skicka-knapp */}
                    <button type="submit" className=" flex items-center justify-center gap-2 w-full py-3 px-6 font-semibold text-white  cursor-pointer bg-[var(--secondary-color)]  rounded-lg hover:bg-[var(--secondary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--secondary-color)] transition-all duration-300">
                        <IoIosSend />
                        Skicka felanmälan
                    </button>
                </form>

                {/* Success Modal */}
                {/* <SuccessModal isOpen={isModalOpen} faultId={faultId} setIsModalOpen={setIsModalOpen}/> */}
                {isModalOpen && (<FormModal formIsSent={formIsSent} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />)}
            </div>
        </div>
    );
}
