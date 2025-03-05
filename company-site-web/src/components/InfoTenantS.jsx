
const info = [
    { title: 'Nyinsättning av fönster', date: '2025-03-01', text: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book...' },
    { title: 'Nytt bredband', date: '2025-02-25', text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters...' },
]

export default function InfoTenantS() {
    return (
        <div className="grid md:grid-cols-2 gap-10  px-10 justify-center max-w-[1200px] mx-auto">
            {info.map((info, index) => (
                <div key={index} className=" p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-100 flex flex-col justify-between">
                    <div>
                        <a href="#">
                            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900">{info.title}</h5>
                        </a>
                        <p className="mb-3 text-gray-700">{info.text}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[var(--primary-color)] rounded-lg hover:bg-[var(--primary-color-hover)] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            Läs mer
                        </a>
                        <p className="text-sm text-gray-500">{info.date}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}