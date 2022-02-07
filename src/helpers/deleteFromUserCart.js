import { API } from "../backend";
var requestOptions = {
  method: "DELETE",
};
export const deleteFromUserCart = (cartid) => {
  return fetch(`${API}usercart/${cartid}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      // data.url="/shop-grid-standard";
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
