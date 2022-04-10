import PropTypes from "prop-types";
import React from "react";
import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, getSortParams }) => {
  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  className="categorybutton"
                  onClick={(e) => {
                    getSortParams("category", "");

                    setActiveSort(e, ".categorybutton");
                  }}
                >
                  <span className="checkmark" /> All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key} >
                  <div className="sidebar-widget-list-left">
                    <button
                      className="categorybutton"
                      id={"category"+key}
                      onClick={(e) => {
                        getSortParams("category", category);
                        setActiveSort(e, ".categorybutton");
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
