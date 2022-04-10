import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const decreaseFromUserWishlist = (userid,product_id) => {
  return fetch(`${API}wishlist/decrease/${userid}/${product_id}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
