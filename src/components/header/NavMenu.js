import PropTypes from "prop-types";
import React from "react";
import { Link, Redirect } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import {
  getIndividualCategories,
  getProducts,
  setActiveSort,
} from "../../helpers/product";
import { connect } from "react-redux";
import { isAuthenticated } from "../../helpers/auth";
const NavMenu = ({ products, strings, menuWhiteClass, sidebarMenu }) => {
  const PerformRedirect = () => {
    return <Redirect to="/shop-grid-standard" />;
  };
  const myfun = (key) => {
    // console.log(e);
    // setActiveSort(e, ".categorybutton");
    // <Redirect to="/shop-grid-standard" />
    PerformRedirect();
    let fun = () => {
      let button = document.getElementById("category" + key);
      button.click();
    };
    setTimeout(fun, 200);
  };
  const uniqueCategories = getIndividualCategories(products);
  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["home"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa" />
              )}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {" "}
              {strings["shop"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                // <i className="fa " />
                <i className="fa fa-angle-down" />
              )}
            </Link>

            <ul className="submenu">
              {uniqueCategories.map((string, key) => {
                return (
                  <li key={key}>
                    <Link
                      to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                      onClick={(e) => {
                        myfun(key);
                      }}
                    >
                      {string.charAt(0).toUpperCase() + string.slice(1)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              {strings["collection"]}
            </Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>
              {strings["pages"]}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              <li>
                <Link to={process.env.PUBLIC_URL + "/cart"}>
                  {strings["cart"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/checkout"}>
                  {strings["checkout"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/wishlist"}>
                  {strings["wishlist"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/compare"}>
                  {strings["compare"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/orders"}>
                  Order History
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/my-account"}>
                  {strings["my_account"]}
                </Link>
              </li>
              {
                !isAuthenticated()&&
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  {strings["login_register"]}
                  
                </Link>
              </li>}

              <li>
                <Link to={process.env.PUBLIC_URL + "/about"}>
                  {strings["about_us"]}
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/contact"}>
                  Book An Appointment
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link to={process.env.PUBLIC_URL + "/contact"}>
              Book An Appointment
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};
const mapStateToProps = (state, ownProps) => {
  return {
    products: getProducts(
      state.productData.products,
      ownProps.category,
      ownProps.type,
      ownProps.limit
    ),
  };
};
export default connect(mapStateToProps)(multilanguage(NavMenu));
