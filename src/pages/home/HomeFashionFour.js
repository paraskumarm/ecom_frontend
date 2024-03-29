import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve";
import NewsletterTwo from "../../wrappers/newsletter/NewsletterTwo";
import ProductGridFiveContainer from "../../wrappers/product/ProductGridFiveContainer";

const HomeFashionFour = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Darzi Warzi| Fashion Home</title>
        <meta name="description" content="Fashion home of Darzi Warzi." />
      </MetaTags>
      <LayoutOne>
        {/* hero slider */}
        <HeroSliderTwelve />
        {/* product grid */}
        <ProductGridFiveContainer
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          category="accessories"
        />

        {/* newsletter */}
        {/* <NewsletterTwo spaceBottomClass="pb-100" /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionFour;
