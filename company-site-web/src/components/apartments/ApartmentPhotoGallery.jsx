import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useParams } from "react-router-dom";
import API from "../../services/api-service";
import LightboxGallery from "./LightboxGallery";
import placeholderImg from '../../assets/images//house-placeholder.jpg';
import NotFound from '../../pages/NotFound';

export default function ApartmentPhotoGallery() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [isBiggerThanMobile, setIsBiggerThanMobile] = useState(window.innerWidth > 640);
    const [imageDimensions, setImageDimensions] = useState([]);

    const { id } = useParams();
    const [apartment, setApartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchApartment() {
            try {
                const data = await API.getApartment(id);
                if (!data) throw new Error(id);
                setApartment(data);
            } catch (error) {
                console.error("Error fetching apartment:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchApartment();
    }, [id]);

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

    const openGallery = () => {
        setGalleryOpen(true);
    };

    const closeGallery = () => {
        setGalleryOpen(false);
    };

    // Check size of screen
    useEffect(() => {
        const handleResize = () => setIsBiggerThanMobile(window.innerWidth > 640);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    if (error) return <NotFound />;

    return (
        <>
            {/* Render LightboxGallery if open */}
            {galleryOpen && (
                <LightboxGallery
                    images={apartment.images}
                    quantityImages={apartment.images.length}
                    onClose={closeGallery}
                />
            )}
            <div className="max-w-[1200px] mx-auto my-5 ">
                {!loading ? (
                    <>
                        {/* Main image */}
                        <Swiper
                            // key={apartment.images.length > 0 ? 'images-loaded' : 'placeholder'}
                            loop={true}
                            // spaceBetween={10}
                            navigation={true}
                            thumbs={{ swiper: thumbsSwiper }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="relative custom-swiper mx-auto sm:rounded-lg lg:max-h-[80vh] lg:w-full"
                            onSlideChange={(swiper) => {
                                setActiveIndex(swiper.realIndex); // Track active slide index
                                if (thumbsSwiper) {
                                    thumbsSwiper.slideTo(Math.max(swiper.realIndex - 1, 0)); // Shift thumbnails
                                }
                            }}
                        >
                            {/* If no images in data use placeholder image */}
                            {(apartment.images.length > 0 ? apartment.images : [{ id: 'placeholder', image: placeholderImg }]).map((image) => {
                                const imageDim = imageDimensions.find((dim) => dim.id === image.id);
                                if (!imageDim && image.id !== 'placeholder') return null; // If image dimensions are not available yet, skip the image
                                return (
                                    <SwiperSlide key={image.id} className=" bg-cover bg-center">
                                        <img
                                            className={`${imageDim ? getImageClass(imageDim.width, imageDim.height) : "object-cover"} w-full h-full`}
                                            src={image.image}
                                            alt="Bild på lägenhet"
                                            onClick={() => openGallery()}
                                        />
                                    </SwiperSlide>
                                );
                            })}
                            {apartment.images.length > 1 && isBiggerThanMobile && (
                                <button type="button" onClick={() => openGallery()} className="absolute bottom-3 right-5 z-10 px-3 py-1 bg-white text-gray-900 font-semibold rounded-md shadow-xl cursor-pointer md:bottom-5 md:right-5">Alla bilder</button>
                            )}
                        </Swiper>
                        {/* Small image carousel if more than 1 image */}
                        {apartment.images.length > 1 && isBiggerThanMobile && (
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={5}
                                // freeMode={false}
                                watchSlidesProgress={true}
                                allowTouchMove={false}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mx-auto mt-2 rounded-sm "
                            >
                                {apartment.images.map((image, index) => (
                                    <SwiperSlide key={image.id}>
                                        <img className={`custom-swiper-slide-img object-cover md:rounded-sm cursor-pointer  ${index === activeIndex ? "border-2 border-[var(--primary-color)]" : ""}`}
                                            src={`${image.image}`} alt={`Bild på lägenhet (${index + 1})`} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </>

                ) : (
                    <div className="mx-auto sm:rounded-lg lg:max-h-[80vh] w-full aspect-[5/3] bg-gray-200 animate-pulse">
                        <div role="status"></div>
                        <span className="sr-only">Laddar lägenhetsbilder...</span>
                    </div>
                )}
            </div>
        </>
    );
}
