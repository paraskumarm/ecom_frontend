import React, { useState } from "react";
import { isAuthenticated } from "../../helpers/auth";
import { processPayment } from "../../helpers/paymentHepler";

const PaymentP = (products) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  
  const startPayment = () => {
    console.log("payment processing...");
    let product_names = "";
    let total_products = 0;
    let total_amount = 0;
    let pkarr = [];
    let quantity_info=[];
    let color_info=[];
    let size_info=[];
    console.log(products.products);
    products.products.forEach(function (item) {
      product_names += item.name + "QTY=" + item.quantity + ", ";
      total_products += item.quantity;
      total_amount +=
        (item.price - (item.discount / 100) * item.price) * item.quantity;
      pkarr.push(item.id);
      quantity_info.push(item.quantity);
      color_info.push(item.selectedProductColor);
      size_info.push(item.selectedProductSize);
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
    const userId = isAuthenticated() && isAuthenticated().user.id;
    const token = isAuthenticated() && isAuthenticated().token;
    const addressId = localStorage.getItem("address_id");
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

    processPayment(userId, token, addressId, bodyData)
      .then((res) => {
        console.log("Payment_Successful", res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      {console.log(products)}
      <button onClick={startPayment}>Make Payment</button>
    </>
  );
};
export default PaymentP;
