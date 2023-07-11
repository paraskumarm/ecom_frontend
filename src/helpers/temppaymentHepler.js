import { API } from "../backend";
import axios from "axios";
import { deleteAllFromUserCart } from "./deleteAllFromUserCart";
import { isAuthenticated } from "./auth";
const handleSuccess = (res) => {
  // separate key and values from the res object which is nothing but param_dict
  let keyArr = Object.keys(res);
  let valArr = Object.values(res);

  // when we start the payment verification we will hide our Product form
  // document.getElementById("paymentFrm").style.display = "none";

  // Lets create a form by DOM manipulation
  // display messages as soon as payment starts
  let heading1 = document.createElement("h1");
  heading1.innerText = "Redirecting you to the paytm....";
  let heading2 = document.createElement("h1");
  heading2.innerText = "Please do not refresh your page....";

  //create a form that will send necessary details to the paytm
  let frm = document.createElement("form");
  // frm.action = "https://securegw-stage.paytm.in/theia/api/v1/initiateTransaction?mid=JgQtJz68702747781571&orderId=107"; //local
  frm.action = "https://securegw-stage.paytm.in/order/process/"; //local
  // frm.action = "https://securegw.paytm.in/order/process/";//prod
  
  frm.method = "post";
  frm.name = "paytmForm";

  // we have to pass all the credentials that we've got from param_dict
  keyArr.map((k, i) => {
    // create an input element
    let inp = document.createElement("input");
    inp.key = i;
    inp.type = "hidden";
    // input tag's name should be a key of param_dict
    inp.name = k;
    // input tag's value should be a value associated with the key that we are passing in inp.name
    inp.value = valArr[i];
    // append those all input tags in the form tag
    frm.appendChild(inp);
  }); // append all the above tags into the body tag
  document.body.appendChild(heading1);
  document.body.appendChild(heading2);
  document.body.appendChild(frm);
  // finally submit that form
  frm.submit();
  deleteAllFromUserCart(isAuthenticated().user.id)
    .then((res) => console.log(res))
    .catch((e) => console.log(e));
  // if you remember, the param_dict also has "'CALLBACK_URL': 'http://127.0.0.1/api/handlepayment/'"
  // so as soon as Paytm gets the payment it will hit that callback URL with some response and
  // on the basis of that response we are displaying the "payment successful" or "failed" message
};

export const processPayment = async (userId, token, addressId, orderData) => {
  // send data to the backend

  await axios({
    url: `${API}paytmGateway/pay/${userId}/${token}/${addressId}/`,
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: orderData,
  }).then((res) => {
    // we will retrieve the param_dict that we are sending from the backend with
    // all the necessary credentials, and we will pass it to the handleSuccess() func
    //  for the further process
    console.log("res",res);
    let len=Object.keys(res.data.param_dict).length;
    // console.log("bI");/
    if (res&&len) {
      // console.log("HI");
      handleSuccess(res.data.param_dict);
    }
  });
};
