import { API } from "../backend";
var requestOptions = {
  method: "DELETE",
};
export const deleteFromUserCart = (cartid) => {
  return fetch(`${API}usercart/${cartid}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
