import { API } from "../backend";

export const postAddress = (userId, billingDetails) => {
  const formData = new FormData();
  for (const key in billingDetails) {
    console.log(billingDetails[key]);
    formData.append(key, billingDetails[key]);
  }
  return fetch(`${API}address/add/${userId}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
      console.log("formData=", formData);
    });
};

/*
export const signin = (user) => {
   
    const { email, password } = user;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
  
    for (var key of formData.keys()) {
      console.log("MYKEY: ", key);
    }
  
    return fetch(`${API}user/login/`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // console.log("LOGIN RESPONSE: ", response);
        return response.json();
      })
      .catch((err) => console.log(err));
  };



  var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var formdata = new FormData();
formdata.append("first_name", "paras5");
formdata.append("last_name", "kumar");
formdata.append("street_address", "street1");
formdata.append("city", "city1");
formdata.append("state", "state1");
formdata.append("pincode", "201011");
formdata.append("phone", "9999999999");
formdata.append("email", "paras5@gmail.com");

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://localhost:8000/api/address/add/5/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  */
