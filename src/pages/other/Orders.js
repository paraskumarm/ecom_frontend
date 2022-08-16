import { getOrderHistory } from "../../helpers/orderHistoryHelper";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { isAuthenticated } from "../../helpers/auth";

const Orders = ({
  location,
  cartItems,
  currency,
  decreaseQuantity,
  addToCart,
  deleteFromCart,
  deleteAllFromCart,
}) => {
  let [orders, setorders] = useState([
    {
      url: "",
      product_names: " ",
      total_products: "",
      total_amount: "",

      quantity_info: "",
      pkarrqty: [],
      color_info: "",
      size_info: "",
      status_info: "",

      isPaid: false,
      created_at: "",
      updated_at: "",
      user: {
        url: "",
        password: "",
        last_login: "",
        is_superuser: false,
        first_name: "",
        last_name: "",
        is_staff: false,
        is_active: false,
        date_joined: "",
        name: "",
        email: "",
        phone: null,
        gender: null,
        session_token: "",
        created_at: "",
        updated_at: "",
        groups: [],
        user_permissions: [],
      },
      address: {
        url: "",
        first_name: "",
        last_name: "",
        street_address: "",
        city: "",
        state: "",
        pincode: "",
        phone: "",
        email: "",
        created_at: "",
        updated_at: "",
        user: {
          url: "",
          password: "",
          last_login: "",
          is_superuser: false,
          first_name: "",
          last_name: "",
          is_staff: false,
          is_active: false,
          date_joined: "",
          name: "",
          email: "",
          phone: "",
          gender: null,
          session_token: "",
          created_at: "",
          updated_at: "",
          groups: [],
          user_permissions: [],
        },
      },
      product: {
        url: "",
        name: "",
        price: "",
        discount: 0,
        offerEnd: "",
        new: false,
        rating: 0,
        saleCount: 0,
        category: [],
        tag: [],
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: "",
        shortDescription: "",
        fullDescription: "",
        created_at: "",
        updated_at: "",
        variation: [
          {
            url: "",
            color: "",
            image: null,
            size: [
              {
                url: "",
                name: "",
                stock: 0,
              },
            ],
          },
        ],
      },
    },
  ]);
  const loadOrderHistory = () => {
    isAuthenticated() &&
      getOrderHistory()
        .then((data) => {
          if (data.error) {
          } else {
            console.log(data);
            data.reverse();
            // let pkarrqty=[2];

            /*
            for (let i = 0; i < data.length; i++) {              
              let quantity_info = data[i].quantity_info;
              quantity_info = quantity_info.slice(1, quantity_info.length - 1);
              quantity_info = quantity_info.split(",");
              let color_info = data[i].color_info;
              color_info = color_info.slice(1, color_info.length - 1);
              color_info = color_info.split(",");
              let size_info = data[i].size_info;
              size_info = size_info.slice(1, size_info.length - 1);
              size_info = size_info.split(",");
              let status_info = data[i].status_info;
              // status_info = status_info.slice(1, status_info.length - 1);
              status_info = status_info.split(",");
              data[i].color_info = color_info;
              data[i].size_info = size_info;
              data[i].quantity_info = quantity_info;
              data[i].status_info = status_info;
              let pkarrqty=data[i].pkarrqty;
              pkarrqty = pkarrqty.slice(1, pkarrqty.length - 1);
              pkarrqty = pkarrqty.split(",");
              // console.log(pkarrqty);
              let neworders=[];
              // console.log(pkarrqty);
              console.log(data[i].products);
              console.log(pkarrqty);
              for(let j=0;j<pkarrqty.length;j++){
                // console.log(typeof(parseInt(pkarrqty[i])));
                let n=parseInt(pkarrqty[j]);
                console.log(n);
                for(let k=0;k<n;k++){
                  neworders.push(data[i].products[j]);
                  // neworders.reverse();
                }
              }
              // console.log(neworders);
              data[i].products=neworders;
            }
            

            */
            // console.log(data);
            setorders(data);
          }
        })
        .catch((err) => console.log(err));
  };
  const [quantityCount] = useState(1);
  const { addToast } = useToasts();
  const { pathname } = location;
  let cartTotalPrice = 0;
  const getdate = (date) => {
    let currentdate = date.split("T");
    let mydate = currentdate[0].split("-");
    let year = mydate[0];
    let month = mydate[1];
    let dat = mydate[2];
    return dat + "/" + month + "/" + year;
  };
  const gettime = (date) => {
    let currentdate = date.split("T");
    let time = currentdate[1].substring(0, 8);
    return time;
  };
  useEffect(() => {
    loadOrderHistory();
  }, []);
  return (
    <Fragment>
      <MetaTags>
        <title>Darzi Warzi|Orders</title>
        <meta name="description" content="Orders page of Darzi Warzi." />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Orders
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        <Breadcrumb />

        {/* { console.log("orders= ",orders)} */}

        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {isAuthenticated() && orders && orders.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">Your Order History</h3>

                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Unit Price</th>
                            <th>Qty</th>
                            <th>Subtotal</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, key) => {
                            // console.log(order);
                            let cartItem = order.product;
                            // return order.product.map(
                            //   (cartItem, key) => {
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
                              <tr key={key}>
                                <td className="product-thumbnail">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product-tab-left/" +
                                      cartItem.url.substring(
                                        cartItem.url.length - 2,
                                        cartItem.url.length - 1
                                      )
                                    }
                                  >
                                    <img
                                      className="img-fluid"
                                      src={
                                        process.env.PUBLIC_URL + cartItem.image1
                                      }
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/product-tab-left/" +
                                      cartItem.url.substring(
                                        cartItem.url.length - 2,
                                        cartItem.url.length - 1
                                      )
                                    }
                                  >
                                    {cartItem.name}
                                  </Link>
                                  {order.color_info && order.size_info ? (
                                    <div className="cart-item-variation">
                                      <span>
                                        Color: {order.color_info.toUpperCase()}
                                        {/* Color: {order.color_info[key]} */}
                                      </span>
                                      <span>Size: {order.size_info}</span>
                                      <span>
                                        OrderDate: {getdate(order.created_at)}
                                      </span>
                                      <span>
                                        OrderTime: {gettime(order.created_at)}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {"Rs." + finalProductPrice}
                                      </span>
                                      <span className="amount">
                                        {"Rs." + finalDiscountedPrice}
                                      </span>
                                    </Fragment>
                                  ) : (
                                    <span className="amount">
                                      {"Rs." + finalProductPrice}
                                    </span>
                                  )}
                                </td>

                                <td className="product-quantity">
                                  {order.quantity_info}
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? "Rs." +
                                      (
                                        finalDiscountedPrice *
                                        order.quantity_info
                                      ).toFixed(2)
                                    : "Rs." +
                                      (
                                        finalProductPrice * order.quantity_info
                                      ).toFixed(2)}
                                </td>

                                <td className="product-remove">
                                  {order.status_info}
                                </td>
                              </tr>
                              //   );
                              // }
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper">
                      <div className="cart-shiping-update">
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Continue Shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    {isAuthenticated() ? (
                      <div className="item-empty-area__text">
                        No items found in Order History <br />{" "}
                        <Link
                          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                        >
                          Shop Now
                        </Link>
                      </div>
                    ) : (
                      <div className="item-empty-area__text">
                        Login First <br />{" "}
                        <Link to={process.env.PUBLIC_URL + "/login-register"}>
                          Login Now
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Orders.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
