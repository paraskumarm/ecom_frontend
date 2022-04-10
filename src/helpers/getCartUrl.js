
import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const getCartUrl = () => {
  return fetch(`${API}cart/1/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
