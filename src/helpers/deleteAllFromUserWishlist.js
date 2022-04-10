import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const deleteAllFromUserWishlist = (userid) => {
  return fetch(`${API}wishlist/deleteallwishlist/${userid}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};

