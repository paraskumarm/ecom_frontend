import { API } from "../backend";
import Axios from "axios";
import { deleteAllFromUserCart } from "./deleteAllFromUserCart";
import { isAuthenticated } from "./auth";

const handlePaymentSuccess = async (response, user_mailid) => {
  try {
    let bodyData = new FormData();

    // we will send the response we've got from razorpay to the backend to validate the payment
    bodyData.append("response", JSON.stringify(response));

    await Axios({
      url: `${API}paytmGateway/handlepayment/${user_mailid}/`,
      method: "POST",
      data: bodyData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("Everything is OK!");
        deleteAllFromUserCart(isAuthenticated().user.id)
          .then((res) => {console.log(res);
            window.location = process.env.PUBLIC_URL + "/orders";
          })
          .catch((e) => console.log(e));
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(console.error());
  }
};

const loadScript = () => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  document.body.appendChild(script);
};

export const processPayment = async (
  userId,
  token,
  addressId,
  orderData
) => {
  const res = await loadScript();

  const data = await Axios({
    url: `${API}paytmGateway/pay/${userId}/${token}/${addressId}/`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: orderData,
  }).then((res) => {
    return res;
  });

  var options = {
    key_id: process.env.REACT_APP_MERCHANT_ID, // in react your environment variable must start with REACT_APP_
    key_secret: process.env.REACT_APP_MERCHANT_KEY,
    amount: data.data.payment.amount,
    currency: "INR",
    name: "Darzi Warzi",
    description: "Test Transaction",
    image: "", // add image url
    order_id: data.data.payment.id,
    handler: function (response) {
      // we will handle success by calling handlePaymentSuccess method and
      // will pass the response that we've got from razorpay
      handlePaymentSuccess(response, data.data.user_mailid);
    },
    prefill: {
      name: "User's name",
      email: "User's email",
      contact: "User's phone",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  var rzp1 = new window.Razorpay(options);
  rzp1.open();
};
