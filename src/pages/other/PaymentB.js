import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

// import { getmeToken, processPayment } from "./helper/paymentHelper";

import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated, signout } from "../../helpers/auth";
import { createOrder } from "../../helpers/orderHelper";
import { getmeToken, processPayment } from "../../helpers/paymentHepler";

const PaymentB = (products, reload = undefined) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user.id;
  // if(isAuthenticated())
  //   userId=isAuthenticated().user.id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("gettoken:", info);
      if (info.error) {
        setInfo({
          ...info,
          error: info.error,
        });
        signout(() => {
          return <Redirect to="/home-fashion-four" />;
        });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };
  useEffect(() => {
    isAuthenticated() && getToken(userId, token);
  }, []);
  const getAmount = () => {
    let amount = 0;
    console.log("CALCULATING AMOUNT", products.products);
    // console.log(products.products);
    products.products.map((p) => {
      console.log("price=", p);
      amount =
        amount +
        parseInt(p.price) -
        (parseInt(p.discount) / 100) * parseInt(p.price);
    });
    console.log("total=", amount);
    return amount;
  };
  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    console.log("INFO:", info);
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      console.log("MYDATA", data);
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      console.log(paymentData);
      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log("POINT-1", response);
          if (response.error) {
            if (response.code == "1") {
              console.log("PAYMENT FAILED");
              signout(() => {
                return <Redirect to="/home-fashion-four" />;
              });
            }
          } else {
            setInfo({ ...info, success: response.success, loading: false });
            console.log("PAYMENT SUCCESS");

            let product_names = "";
            products.products.forEach(function (item) {
              product_names += item.name + ", ";
            });

            const orderData = {
              products: product_names,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            createOrder(userId, token, orderData)
              .then((response) => {
                console.log(response);
                if (response.error) {
                  //TODO
                  if (response.code == "1") {
                    console.log("Order Failed!");
                    signout(() => {
                      return <Redirect to="/home-fashion-four" />;
                    });
                  }
                } else {
                  if (response.success == true) {
                    console.log("ORDER PLACED!!");
                  }
                }
              })
              .catch((error) => {
                setInfo({ loading: false, success: false });
                console.log("Order FAILED", error);
              });
            // cartEmpty(() => {
            //   console.log("Did we got a crash? Cart is emptied");
            // });
          }
        })
        .catch((error) => {
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED", error);
        });
    });
  };
  const showbtnDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.products.length > 0 ? (
          <div>
            <DropIn
              options={{
                authorization: info.clientToken,
              }}
              onInstance={(instance) => (info.instance = instance)}
            ></DropIn>
            <button onClick={onPurchase} className="btn btn-block btn-info">
              Buy Now
            </button>
          </div>
        ) : (
          <h3>Please login first or add something in cart</h3>
        )}
      </div>
    );
  };
  return (
    <div>
      <h1>PaymentB</h1>
      {products.products.length > 0 ? (
        <h3>Your bill is ₹ {getAmount()}</h3>
      ) : (
        <h3>Your bill is ₹0 </h3>
      )}
      {showbtnDropIn()}
    </div>
  );
};
export default PaymentB;
