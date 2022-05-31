import PropTypes from "prop-types";
import React from "react";
import HeaderFour from "../wrappers/header/HeaderFour";
import FooterTwo from "../wrappers/footer/FooterTwo";

const LayoutFive = ({ children }) => {
  return (
    <div className="wrapper">
      {/* header */}
      <HeaderFour />
      {children}
      <FooterTwo
        backgroundColorClass="bg-black"
        footerTopBackgroundColorClass="bg-black"
        footerTopSpaceTopClass="pt-80"
        spaceBottomClass="pb-25"
        footerLogo="/assets/img/logo/DW-logo.jpeg"
      />
    </div>
  );
};

LayoutFive.propTypes = {
  children: PropTypes.any
};

export default LayoutFive;
