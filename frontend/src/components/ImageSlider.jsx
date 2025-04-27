"use client"; // Ensures the component runs only on the client side

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Swiper modules
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageSlider = () => {
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            navigation // Enables next/prev buttons
            pagination={{ clickable: true }} // Enables pagination dots
            autoplay={{ delay: 3000, disableOnInteraction: false }} // Auto-slide feature
            loop={true} // Infinite scrolling
            className="w-full h-[400px]"
        >
            <SwiperSlide>
                <img
                    src="https://www.shutterstock.com/image-illustration/cyber-attack-breaking-news-daily-600nw-1699077571.jpg"
                    alt="Cybersecurity"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://www.shutterstock.com/shutterstock/videos/1050108439/thumb/7.jpg?ip=x480"
                    alt="Technology"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://wentworth-college.com/wp-content/uploads/2024/10/Cybersecurity-1.jpg"
                    alt="Hacking"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
            <SwiperSlide>
                <img
                    src="https://www.boldbusiness.com/wp-content/uploads/2018/03/Honeywell-Feature-image_v1.jpg"
                    alt="Security"
                    className="w-full h-full object-cover"
                />
            </SwiperSlide>
        </Swiper>
    );
};

export default ImageSlider;