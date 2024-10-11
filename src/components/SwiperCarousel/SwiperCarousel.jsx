import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { IconButton, useMediaQuery } from "@mui/material";

// Array of images for dynamic mapping
const sliderImages = [
  require("../../assets/SliderImages/swiper1.webp"),
  require("../../assets/SliderImages/swiper2.webp"),
  require("../../assets/SliderImages/swiper3.webp"),
  require("../../assets/SliderImages/swiper4.webp"),
  require("../../assets/SliderImages/swiper5.webp"),
  require("../../assets/SliderImages/swiper6.webp"),
  require("../../assets/SliderImages/swiper7.webp"),
  require("../../assets/SliderImages/swiper8.webp"),
  require("../../assets/SliderImages/swiper9.webp"),
];

const SwiperCarousel = () => {
  const swiperRef = React.useRef(null);

  // Define breakpoints using useMediaQuery
  const isXsScreen = useMediaQuery("(max-width:600px)");
  const isSmScreen = useMediaQuery("(max-width:900px)");

  // Determine slidesPerView and coverflow effect based on breakpoints
  const slidesPerView = isXsScreen ? 2 : isSmScreen ? 3 : 4;
  const coverflowEffect = {
    rotate: 10,
    stretch: isXsScreen ? 60 : isSmScreen ? 75 : 100,
    depth: isXsScreen ? 125 : isSmScreen ? 150 : 200,
    modifier: 1,
    slideShadows: true,
  };
  const iconButton = {
    fontSize: "40px",
    backgroundColor: "teal",
    color: "white",
    borderRadius: 10,
    padding: isXsScreen ? 2 : isSmScreen ? 4 : 6,
  };

  return (
    <div
      style={{
        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
        margin: "25px auto",
        width: "90%",
      }}
    >
      <Swiper
        ref={swiperRef}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={slidesPerView}
        loop={true}
        pagination={{ clickable: true }}
        coverflowEffect={coverflowEffect}
        modules={[EffectCoverflow, Pagination]}
        style={{
          width: "100%",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
        initialSlide={2}
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ display: "block", width: "100%", borderRadius: "10px" }}
            />
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        {!isXsScreen && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            <IconButton onClick={() => swiperRef.current.swiper.slidePrev()}>
              <SkipPreviousIcon style={iconButton} />
            </IconButton>
            <IconButton onClick={() => swiperRef.current.swiper.slideNext()}>
              <SkipNextIcon style={iconButton} />
            </IconButton>
          </div>
        )}
      </Swiper>
    </div>
  );
};

export default SwiperCarousel;
