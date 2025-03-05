import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useParams } from "react-router-dom";
import API from "../services/api-service";

export default function PhotoGallery() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [imageDimensions, setImageDimensions] = useState([]);

    useEffect(() => {
        async function fetchApartment() {
            try {
                const data = await API.getApartment(id);
                setApartment(data);
            } catch (error) {
                console.error("Error fetching apartment:", error);
            }
        }
        fetchApartment();
    }, [id]);

    // const images = [
    //     { src: "https://swiperjs.com/demos/images/nature-1.jpg", alt: "Nature 1" },
    //     { src: "https://swiperjs.com/demos/images/nature-2.jpg", alt: "Nature 2" },
    //     { src: "https://swiperjs.com/demos/images/nature-3.jpg", alt: "Nature 3" },
    //     { src: "https://swiperjs.com/demos/images/nature-4.jpg", alt: "Nature 4" },
    //     { src: "https://swiperjs.com/demos/images/nature-5.jpg", alt: "Nature 5" },
    //     { src: "https://swiperjs.com/demos/images/nature-6.jpg", alt: "Nature 6" },
    //     { src: "https://swiperjs.com/demos/images/nature-7.jpg", alt: "Nature 7" },
    //     { src: "https://swiperjs.com/demos/images/nature-8.jpg", alt: "Nature 8" },
    //     { src: "https://swiperjs.com/demos/images/nature-9.jpg", alt: "Nature 9" },
    //     { src: "https://swiperjs.com/demos/images/nature-10.jpg", alt: "Nature 10" }
    // ];

    // Check if the image is portrait or landscape
    useEffect(() => {
        // Dynamically calculate the image width and height
        if (apartment) {
            const newImageDimensions = apartment.images.map((image) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        resolve({
                            id: image.id,
                            width: img.width,
                            height: img.height,
                            src: image.image
                        });
                    };
                    img.src = image.image;
                });
            });

            // Wait for all images to load
            Promise.all(newImageDimensions).then((dimensions) => {
                setImageDimensions(dimensions);
            });
        }
    }, [apartment]);

    // Function to decide the image class (object-cover or object-contain)
    const getImageClass = (width, height) => {
        return width > height ? "object-cover" : "object-contain";
    };

    if (!apartment) return <p>Loading...</p>;

    return (
        <div className="max-w-[1200px] mx-auto my-5">

            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="custom-swiper mx-auto rounded-lg lg:max-h-[80vh] lg:w-full"
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.realIndex); // Track active slide index
                    if (thumbsSwiper) {
                      thumbsSwiper.slideTo(Math.max(swiper.realIndex - 1, 0)); // Shift thumbnails
                    }
                }}
            >
                {apartment.images.map((image) => {
                    const imageDim = imageDimensions.find((dim) => dim.id === image.id);
                    if (!imageDim) return null; // If image dimensions are not available yet, skip the image

                    return (
                        <SwiperSlide key={image.id} className="bg-cover bg-center">
                            <img
                                className={`${getImageClass(imageDim.width, imageDim.height)} w-full h-full `}
                                src={imageDim.src} alt="Bild på lägenhet"
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
            {apartment.images.length > 1 && (
                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mx-auto mt-2 rounded-sm"
                >
                    {apartment.images.map((image) => (
                        <SwiperSlide key={image.id}>
                            <img className={`custom-swiper-slide-img object-cover rounded-sm cursor-pointer ${image.id === activeIndex ? "border-3 border-[var(--primary-color)]" : ""}`} 
                            src={`${image.image}`} alt="Bild på lägenhet" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
