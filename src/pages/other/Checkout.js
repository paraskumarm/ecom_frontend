import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { isAuthenticated } from "../../helpers/auth";

import { postAddress } from "../../helpers/postAddress";
import { processPayment } from "../../helpers/paymentHepler";

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    street_address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
  });
  const [error, seterror] = useState(false);
  const [save, setsave] = useState(false);
  const [processpay, setprocesspay] = useState(false);
  const {
    first_name,
    last_name,
    street_address,
    city,
    state,
    pincode,
    phone,
    email,
  } = values;

  let cartTotalPrice = 0;
  const userId = isAuthenticated() && isAuthenticated().user.id;
  const handleChange = (key) => (event) => {
    setValues({ ...values, [key]: event.target.value });
  };
  const saveAddress = (event) => {
    event.preventDefault();
    if (
      !first_name ||
      !last_name ||
      !state ||
      !street_address ||
      !pincode ||
      !phone ||
      !email
    ) {
      seterror(true);
      return;
    }
    postAddress(userId, values)
      .then((response) => {
        if (response.success) {
          console.log("addreess_id", response.address_id);
          let address_id = response.address_id;
          localStorage.setItem("address_id", JSON.stringify(address_id));
          setsave(true);
        }
      })
      .catch((e) => console.log(e));
  };
  const startPayment = () => {
    // console.log(eve)
    console.log(error, "payment processing...");
    let product_names = "";
    let total_products = 0;
    let total_amount = 0;
    let pkarr = [];
    let quantity_info = [];
    let color_info = [];
    let size_info = [];
    let status_info = [];
    const addressId = localStorage.getItem("address_id");
    console.log(cartItems);
    cartItems.forEach(function (item) {
      product_names += item.name + "QTY=" + item.quantity + ", ";
      total_products += item.quantity;
      total_amount +=
        (item.price - (item.discount / 100) * item.price) * item.quantity;
      pkarr.push(item.id);
      quantity_info.push(item.quantity);
      color_info.push(item.selectedProductColor);
      size_info.push(item.selectedProductSize);
      status_info.push("Order Recieved");
    });
    console.log(pkarr);
    pkarr = JSON.stringify(pkarr);
    quantity_info = JSON.stringify(quantity_info);
    color_info = JSON.stringify(color_info);
    size_info = JSON.stringify(size_info);
    console.log("product_names", product_names);
    console.log("total_products", total_products);
    console.log("total_amount", total_amount);
    console.log("pkarr", pkarr);
    console.log("color_info", color_info);
    console.log("size_info", size_info);
    console.log("status_info", status_info);
    console.log("address_id", addressId);
    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;
    // console.log(JSON.parse(address_id)[0].address);
    // send data to the backend
    let bodyData = new FormData();
    // JSON.stringify(product_info)
    bodyData.append("product_names", product_names);
    bodyData.append("total_products", total_products);
    bodyData.append("total_amount", total_amount);
    bodyData.append("pkarr", pkarr);
    bodyData.append("quantity_info", quantity_info);
    bodyData.append("color_info", color_info);
    bodyData.append("size_info", size_info);
    bodyData.append("status_info", status_info);
    setprocesspay(true);
    seterror(false);
    processPayment(userId, token, addressId, bodyData)
      .then((res) => {
        console.log("Payment_Successful", res);
      })
      .catch((err) => console.log(err));
  };
  const errorMessageSave = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            All Fields are mandatory
          </div>
        </div>
      </div>
    );
  };
  const processMessage = () => {
    return (
      <div className="row">
        <div className="col-md text-left">
          <div
            className="alert alert-success"
            style={{ display: processpay ? "" : "none" }}
          >
            Payment Processing...
          </div>
        </div>
      </div>
    );
  };
  const noIteminCart = () => {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="item-empty-area text-center">
            <div className="item-empty-area__icon mb-30">
              <i className="pe-7s-cash"></i>
            </div>
            <div className="item-empty-area__text">
              {isAuthenticated()
                ? "No items found in cart to checkout "
                : "Login First"}
              <br />{" "}
              <Link to={process.env.PUBLIC_URL + "/login-register"}>
                Login Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      {console.log("process", process)}
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {/* {console.log(cartItems)} */}
            {isAuthenticated() && cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Fill Billing Details</h3>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input
                            type="text"
                            value={first_name}
                            onChange={handleChange("first_name")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input
                            type="text"
                            value={last_name}
                            onChange={handleChange("last_name")}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Street Address</label>
                          <input
                            className="billing-address"
                            placeholder="House number and street name"
                            type="text"
                            value={street_address}
                            onChange={handleChange("street_address")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input
                            type="text"
                            value={city}
                            onChange={handleChange("city")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input
                            type="text"
                            value={state}
                            onChange={handleChange("state")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Pincode</label>
                          <input
                            type="text"
                            value={pincode}
                            onChange={handleChange("pincode")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Phone</label>
                          <input
                            type="text"
                            value={phone}
                            onChange={handleChange("phone")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email Address</label>
                          <input
                            type="text"
                            value={email}
                            onChange={handleChange("email")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {errorMessageSave()}
                  {processMessage()}
                  <div className="your-order-area">
                    {save ? (
                      <div className="row">
                        <div className="place-order mt-25 col-6">
                          <button
                            className="btn-hover "
                            onClick={() => {
                              setsave(false);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="place-order mt-25 col-6">
                          <button className="btn-hover" onClick={startPayment}>
                            Make Payment
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="place-order mt-25">
                        <button className="btn-hover" onClick={saveAddress}>
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>Your order</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Product</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? "Rs." +
                                        (
                                          finalDiscountedPrice *
                                          cartItem.quantity
                                        ).toFixed(2)
                                      : "Rs." +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Shipping</li>
                            <li>Free shipping</li>
                          </ul>
                        </div>

                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Total</li>
                            <li>{"Rs." + cartTotalPrice.toFixed(2)}</li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              noIteminCart()
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

export default connect(mapStateToProps)(Checkout);
