import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const decreaseFromUserCart = (userid,product_id) => {
  return fetch(`${API}usercart/decrease/${userid}/${product_id}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
