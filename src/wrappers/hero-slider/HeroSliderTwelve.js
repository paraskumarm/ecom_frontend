import React, { useEffect } from "react";
import Swiper from "react-id-swiper";
import sliderData from "../../data/hero-sliders/hero-slider-twelve.json";

import { getHeroSliders } from "../../helpers/getHeroSliders";
import HeroSliderTwelveSingle from "../../components/hero-slider/HeroSliderTwelveSingle.js";
import { useState } from "react";

const HeroSliderTwelve = () => {
  // const [sliderData, setsliderData] = useState([]);
  // const [error, setError] = useState(false);
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    watchSlidesVisibility: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
    
  };
  

  const loadAllProducts = () => {
    getHeroSliders().then((data) => {
      if (data.error) {
        // setError(data.error);
        console.log(data.error);
      } else {
        console.log("SLIDER DATA",data);
        // setsliderData(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  },[]);

  return (
    <div className="slider-area">
      <div className="slider-active-2 nav-style-2">
      
        <Swiper {...params}>
          {sliderData &&
            sliderData.map((single, key) => {
              return (
                <HeroSliderTwelveSingle
                  data={single}
                  key={single.id}
                  sliderClass="swiper-slide"
                />
              );
            })}
            {/* {console.log("outside")} */}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderTwelve;
