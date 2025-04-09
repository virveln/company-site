import { TbReload } from "react-icons/tb";
import { FaHouse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSadTear } from "react-icons/fa";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 mt-[10vh] mb-[5vh] sm:mt-[20vh] sm:mb-[10vh] flex flex-col sm:flex-row gap-10 justify-center items-center sm:items-start">
            {/* Circle and smiley */}
            <div className="relative h-fit w-fit">
                <div className="absolute inset-0 transform scale-[2.4] rounded-full bg-[var(--primary-color)] opacity-[0.1] z-[-1]"></div>
                <div className=" relative h-fit w-fit">
                    <FaSadTear className="text-[var(--primary-color)] text-[100px] sm:text-[140px]" />
                </div>
            </div>

            {/* Main content */}
            <div className="text-center sm:text-left  z-20">
                <h1 className="text-7xl sm:text-9xl font-extrabold text-[var(--primary-color)] leading-none select-none">
                    404
                </h1>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
                    Oops! Sidan kunde inte hittas
                </h2>
                <p className="text-gray-500 mb-8">
                    Tyvärr kunde inte sidan du letar efter hittas. <br />
                    Kontrollera stavning, ladda om sidan eller gå tillbaka till startsidan.
                </p>
                <div className="mt-10 flex flex-row justify-center sm:justify-start gap-x-6">
                    <button onClick={() => window.location.reload()} className="text-3xl text-[var(--primary-color)] cursor-pointer transition-transform duration-500 hover:rotate-[360deg]">
                        <TbReload />
                    </button>
                    <button onClick={() => navigate("/")} className="flex items-baseline justify-center gap-2 w-[130px] p-2 h-fit cursor-pointer text-center font-semibold text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color-hover)] hover:tracking-wide focus:outline-2 focus:outline-offset-2 focus:outline-[var(--primary-color)] transition-all duration-300" >
                        <FaHouse /> Startsida
                    </button>
                </div>
            </div>
        </div>
    )
}