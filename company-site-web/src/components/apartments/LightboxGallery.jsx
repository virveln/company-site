import PropTypes from "prop-types";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const LightboxGallery = ({ images, quantityImages, onClose }) => {
    useEffect(() => {
        // Disable scrolling on the main page when gallery is open
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // Restore scrolling when closed
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-2000">
            <div className="relative w-full max-w-[90vw] h-full max-h-[95vh] bg-white pb-14 pt-2 rounded-lg shadow-lg">
                <div className="pb-10">

                    <p className="absolute top-4 left-5 font-semibold">Alla bilder: {quantityImages} st</p>
                    {/* Close Button */}
                    <button className="absolute top-3 right-3 cursor-pointer hover:text-[var(--secondary-color)]" onClick={onClose}>
                        <IoClose size={30} />
                    </button>
                </div>

                {/* Image Scroll Container */}
                <div className=" h-full overflow-y-auto flex flex-col gap-4 p-4">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image.image}
                            alt="Lägenhetsbild"
                            className=''
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

LightboxGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    quantityImages: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default LightboxGallery;
