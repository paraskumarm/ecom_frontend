import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopSize = ({ sizes, getSortParams }) => {
  sizes=["S","M","L","XL","XXL"];
  return (
    
    <div className="sidebar-widget mt-40">
      {/* {console.log(sizes)}  */}
      <h4 className="pro-sidebar-title">Size </h4>
      <div className="sidebar-widget-list mt-20">
        {sizes ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className="sizebutton"
                  onClick={(e) => {
                    getSortParams("size", "");
                    setActiveSort(e, ".sizebutton");
                  }}
                >
                  <span className="checkmark" /> All Sizes{" "}
                </button>
              </div>
            </li>
            {sizes.map((size, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase sizebutton"
                      onClick={(e) => {
                        getSortParams("size", size);
                        setActiveSort(e, ".sizebutton");
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {size}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No sizes found"
        )}
      </div>
    </div>
  );
};

ShopSize.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array,
};

export default ShopSize;
