// export const getCartUrl = () => {
//   return fetch("http://localhost:8000/api/cart/1/", requestOptions)
//     .then((response) => response.text())
//     .then((result) => {return result})
//     .catch((error) => console.log("error", error));



// };
import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const getCartUrl = () => {
  return fetch(`${API}cart/1/`, requestOptions)
    .then((response) => {
      let data = response.json();
      // data.url="/shop-grid-standard";
      // console.log(data);
      return data;
    })
    .catch((err) => console.log(err));
};
