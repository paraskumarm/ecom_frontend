import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Paginator from "react-hooks-paginator";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getSortedProducts } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridStandard = ({ location, products }) => {
  const [layout, setLayout] = useState("grid three-column");


  const [sortTypeCategory, setSortTypeCategory] = useState("");
  const [sortValueCategory, setSortValueCategory] = useState("");

  const [sortTypeTag, setSortTypeTag] = useState("");
  const [sortValueTag, setSortValueTag] = useState("");

  const [sortTypeSize, setSortTypeSize] = useState("");
  const [sortValueSize, setSortValueSize] = useState("");

  const [sortTypeColor, setSortTypeColor] = useState("");
  const [sortValueColor, setSortValueColor] = useState("");

  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");

  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const pageLimit = 15;
  const { pathname } = location;

  const getLayout = (layout) => {
    setLayout(layout);
  };

   const  getSortParamsCategory = (sortType, sortValue) => {
    setSortTypeCategory(sortType);
    setSortValueCategory(sortValue);
  };
  const getSortParamsSize = (sortType, sortValue) => {
    setSortTypeSize(sortType);
    setSortValueSize(sortValue);
  };
  const getSortParamsColor = (sortType, sortValue) => {
    setSortTypeColor(sortType);
    setSortValueColor(sortValue);
  };
  const getSortParamsTag = (sortType, sortValue) => {
    setSortTypeTag(sortType);
    setSortValueTag(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(
      products,
      sortTypeCategory,
      sortValueCategory
    );
    sortedProducts = getSortedProducts(
      sortedProducts,
      sortTypeCategory,
      sortValueCategory
    );
    sortedProducts = getSortedProducts(
      sortedProducts,
      sortTypeColor,
      sortValueColor
    );
    sortedProducts = getSortedProducts(
      sortedProducts,
      sortTypeSize,
      sortValueSize
    );
    sortedProducts = getSortedProducts(
      sortedProducts,
      sortTypeTag,
      sortValueTag
    );
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [
    offset,
    products,
    sortTypeCategory,
    sortValueCategory,
    sortTypeColor,
    sortValueColor,
    sortTypeTag,
    sortValueTag,
    sortTypeSize,
    sortValueSize,
    filterSortType,
    filterSortValue,
  ]);
  const myfun=(e)=>{
    e.preventDefault();
    let filterval=document.getElementById("sidesearchbar").value.toLowerCase();
    let search=[];
    for(let i=0;i<products.length;i++){
      if(products[i].name.toLowerCase().includes(filterval)){
        search.push(products[i]);
      }
    }
    setCurrentData(search);
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Shop Page</title>
        <meta
          name="description"
          content="Shop page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Shop
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}
                <div className="sidebar-widget">
                  <h4 className="pro-sidebar-title">Search </h4>
                  <div className="pro-sidebar-search mb-50 mt-25">
                    <form className="pro-sidebar-search-form" action="#">
                      <input
                        type="text"
                        placeholder="Search here..."
                        id="sidesearchbar"
                      />
                      <button onClick={myfun}>
                        <i className="pe-7s-search" />
                      </button>
                    </form>
                  </div>
                </div>
                <ShopSidebar
                  products={products}
                  // getSortParams={getSortParams}
                  setCurrentData={setCurrentData}
                  getSortParamsCategory={getSortParamsCategory}
                  getSortParamsSize={getSortParamsSize}
                  getSortParamsColor={getSortParamsColor}
                  getSortParamsTag={getSortParamsTag}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={currentData.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={currentData} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

ShopGridStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    products: state.productData.products,
  };
};

export default connect(mapStateToProps)(ShopGridStandard);
