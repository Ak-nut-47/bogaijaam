import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./stylesswiper.css";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { IconButton } from "@mui/material";

// Array of images for dynamic mapping
const sliderImages = [
  require("../../assets/SliderImages/swiper1.jpeg"),
  require("../../assets/SliderImages/swiper2.jpeg"),
  require("../../assets/SliderImages/swiper3.jpeg"),
  require("../../assets/SliderImages/swiper4.jpeg"),
  require("../../assets/SliderImages/swiper5.jpeg"),
];

const SwiperCarousel = () => {
  const swiperRef = React.useRef(null);

  return (
    <div className="slider_container" id="slider_container">
      <Swiper
        ref={swiperRef} // Store swiper instance
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        loop={true}
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
        initialSlide={2}
      >
        {/* Map over slider images */}
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        <div className="swiper-nav-btns">
          <IconButton
            className="swiper-nav-btn"
            onClick={() => swiperRef.current.swiper.slidePrev()}
          >
            <SkipPreviousIcon className="swiper-nav-icon" />
          </IconButton>
          <IconButton
            className="swiper-nav-btn"
            onClick={() => swiperRef.current.swiper.slideNext()}
          >
            <SkipNextIcon className="swiper-nav-icon" />
          </IconButton>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
