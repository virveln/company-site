// import { FaTimes } from 'react-icons/fa'; // You can use react-icons for the "X" icon
import PropTypes from 'prop-types';
import { useEffect } from 'react';

// const SuccessModal = ({ isOpen, faultId, setIsModalOpen }) => {
const FormModal = ({ formIsSent, isOpen, setIsModalOpen }) => {
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
            if (e.key === "Escape") setIsModalOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setIsModalOpen]);


    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1000">
            <div className="relative w-[90%] max-w-[500px] h-[300px] bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                {/* Close Button */}
                {/* <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-600 cursor-pointer hover:text-gray-800 focus:outline-none"
                >
                    <FaTimes size={24} />
                </button> */}

                <h2 className={`text-2xl font-semibold ${formIsSent ? 'text-green-600' : 'text-red-600'}`}>{formIsSent ? 'Formulär skickat!' : 'Error'}</h2>
                {/* <p className="text-lg">Ditt referensid är: <strong>{faultId}</strong></p> */}
                {/* {formIsSent && (<p className="mt-4 text-lg">Vi ser över ditt ärende så fort vi kan</p>)} */}
                <p className="mt-4 text-lg">{formIsSent ? 'Vi ser över ditt ärende så fort vi kan.' : 'Något gick fel. Försök igen.'}</p>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute bottom-6 bg-[var(--primary-color)] text-white font-semibold px-8 py-2 rounded-lg cursor-pointer hover:bg-[var(--primary-color-hover)] transition"
                >
                    Stäng
                </button>

            </div>
        </div>
    );
};

FormModal.propTypes = {
    formIsSent: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    // faultId: PropTypes.string,
    setIsModalOpen: PropTypes.func.isRequired,
};

export default FormModal;
