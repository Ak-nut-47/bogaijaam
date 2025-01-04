import { useEffect, useState } from "react";

export const useCachedSliderImages = () => {
  const [cachedImages, setCachedImages] = useState([]);

  useEffect(() => {
    const sessionKey = "sliderImageCache";
    const cachedImagesFromSession = sessionStorage.getItem(sessionKey);

    if (cachedImagesFromSession) {
      setCachedImages(JSON.parse(cachedImagesFromSession));
    } else {
      // Cache images for the first time
      const sliderImages = [
        require("../assets/SliderImages/swiper1.webp"),
        require("../assets/SliderImages/swiper2.webp"),
        require("../assets/SliderImages/swiper3.webp"),
        require("../assets/SliderImages/swiper4.webp"),
        require("../assets/SliderImages/swiper5.webp"),
        require("../assets/SliderImages/swiper6.webp"),
        require("../assets/SliderImages/swiper7.webp"),
        require("../assets/SliderImages/swiper8.webp"),
        require("../assets/SliderImages/swiper9.webp"),
      ];
      setCachedImages(sliderImages);
      sessionStorage.setItem(sessionKey, JSON.stringify(sliderImages));
    }
  }, []);
  console.log("Cached images are ______", cachedImages);
  return cachedImages;
};
