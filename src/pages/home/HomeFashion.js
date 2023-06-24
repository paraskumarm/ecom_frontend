import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import HeroSliderTwelve from "../../wrappers/hero-slider/HeroSliderTwelve";
import ProductGridFiveContainer from "../../wrappers/product/ProductGridFiveContainer";
import Layout from "../../layouts/Layout";

const HomeFashion = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Darzi Warzi| Fashion Home</title>
        <meta name="description" content="Fashion home of Darzi Warzi." />
      </MetaTags>
      <Layout>
        <HeroSliderTwelve />
        <ProductGridFiveContainer
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          category="accessories"
        />
      </Layout>
    </Fragment>
  );
};

export default HomeFashion;
