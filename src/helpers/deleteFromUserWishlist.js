import { API } from "../backend";
var requestOptions = {
  method: "DELETE",
};
export const deleteFromUserWishlist = (cartid) => {
  return fetch(`${API}wishlist/${cartid}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
