import PropTypes from "prop-types";
import React, { useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";
import ForgotPassword from "./pages/other/ForgotPassword";

// home pages

const HomeFashionFour = lazy(() => import("./pages/home/HomeFashionFour"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// const ShopListStandard = lazy(() => import("./pages/shop/ShopListStandard"));
// const ShopListFullWidth = lazy(() => import("./pages/shop/ShopListFullWidth"));
// const ShopListTwoColumn = lazy(() => import("./pages/shop/ShopListTwoColumn"));

// product pages
// const Product = lazy(() => import("./pages/shop-product/Product"));
const ProductTabLeft = lazy(() =>
  import("./pages/shop-product/ProductTabLeft")
);
// const ProductTabRight = lazy(() =>
//   import("./pages/shop-product/ProductTabRight")
// );
// const ProductSticky = lazy(() => import("./pages/shop-product/ProductSticky"));
// const ProductSlider = lazy(() => import("./pages/shop-product/ProductSlider"));
// const ProductFixedImage = lazy(() =>
//   import("./pages/shop-product/ProductFixedImage")
// );

// other pages
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));
const Orders = lazy(() => import("./pages/other/Orders"));
const Wishlist = lazy(() => import("./pages/other/Wishlist"));
const Compare = lazy(() => import("./pages/other/Compare"));
const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
        },
      })
    );
  });

  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* Homepages */}

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={HomeFashionFour}
                />

                {/* Shop pages */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/shop-grid-standard"}
                  component={ShopGridStandard}
                />

                {/* Shop product pages */}

                <Route
                  path={process.env.PUBLIC_URL + "/product-tab-left/:id"}
                  component={ProductTabLeft}
                />


                {/* Other pages */}
                
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/contact"}
                  component={Contact}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/my-account"}
                  component={MyAccount}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/login-register"}
                  component={LoginRegister}
                />

                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/wishlist"}
                  component={Wishlist}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/compare"}
                  component={Compare}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/orders"}
                  component={Orders}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/forgot-password"}
                  component={ForgotPassword}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/not-found"}
                  component={NotFound}
                />

                <Route exact component={NotFound} />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));
