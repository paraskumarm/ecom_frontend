import PropTypes from "prop-types";
import React from "react";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
} from "../../helpers/product";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";

const ShopSidebar = ({
  products,
  setCurrentData = (f) => f,
  getSortParamsColor,
  getSortParamsCategory,
  getSortParamsSize,
  getSortParamsTag,
  sideSpaceClass,
}) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueColors = getIndividualColors(products);
  const uniqueSizes = getProductsIndividualSizes(products);
  const uniqueTags = getIndividualTags(products);

  return (
    <div className={`sidebar-style ${sideSpaceClass ? sideSpaceClass : ""}`}>
      {/* shop search */}
      {/* <ShopSearch products={products} setCurrentData={setCurrentData}/>  */}

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParamsCategory}
      />
      {/* filter by color */}
      <ShopColor colors={uniqueColors} getSortParams={getSortParamsColor} />

      {/* filter by size */}
      <ShopSize sizes={uniqueSizes} getSortParams={getSortParamsSize} />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParamsTag} />
    </div>
  );
};

ShopSidebar.propTypes = {
  // getSortParams: PropTypes.func,
  setCurrentData: PropTypes.func,
  getSortParamsColor: PropTypes.func,
  getSortParamsCategory: PropTypes.func,
  getSortParamsSize: PropTypes.func,
  getSortParamsTag: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
