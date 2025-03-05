import bild from '../images/apartments.jpg'

const About = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 my-10">
            <div className="">
                <h1 className="text-4xl font-medium text-gray-900">Om Oss</h1>
                <p className="mt-4 text-lg text-gray-600">
                    Vi skapar hållbara och trygga boendemiljöer med fokus på kvalitet och gemenskap.
                </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
                {/* Bild */}
                <img
                    src={bild}
                    alt="Fastighet"
                    className="rounded-lg shadow-md"
                />

                {/* Text */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800">Vår Historia</h2>
                    <p className="mt-4 text-gray-600">
                        Vi har över 20 års erfarenhet av fastighetsförvaltning och bostadsutveckling.
                        Vår vision är att skapa hem där människor trivs och känner sig hemma.
                    </p>

                    <h2 className="mt-6 text-2xl font-semibold text-gray-800">Vad Vi Gör</h2>
                    <p className="mt-4 text-gray-600">
                        Vi utvecklar, förvaltar och hyr ut bostäder och kommersiella fastigheter. Med fokus på hållbarhet och innovation skapar vi värde för både hyresgäster och samhället.
                    </p>
                </div>
            </div>

            {/* Vision & Värderingar */}
            <div className="mt-16">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">Våra Värderingar</h2>
                <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
                    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Hållbarhet</h3>
                        <p className="mt-2 text-gray-600">Vi bygger och förvaltar med miljön i fokus för en bättre framtid.</p>
                    </div>

                    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Trygghet</h3>
                        <p className="mt-2 text-gray-600">Vi skapar boenden där människor kan känna sig säkra och hemma.</p>
                    </div>

                    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700">Kvalitet</h3>
                        <p className="mt-2 text-gray-600">Vi strävar efter högsta kvalitet i allt vi gör – från service till byggnation.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;