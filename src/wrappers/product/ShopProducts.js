import PropTypes from "prop-types";
import React from "react";
import ProductgridList from "./ProductgridList";

const ShopProducts = ({ products, layout }) => {
  return (
    <div className="shop-bottom-area mt-35">
      {/* {console.log(products)} */}

      {products.length > 0 ? (
        <div className={`row ${layout ? layout : ""}`}>
          <ProductgridList products={products} spaceBottomClass="mb-25" />
        </div>
      ) : (
        <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30 mt-50">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No Products found <br />{" "}
                    </div>
                  </div>
                </div>
              </div>
      )}
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
};

export default ShopProducts;
