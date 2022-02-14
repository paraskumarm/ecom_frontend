import { API } from "../backend";
import { isAuthenticated } from "./auth";

var requestOptions = {
  method: "GET",
};
export const getOrderHistory = () => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  if(userId)
  return fetch(`${API}orderPayTm/?user=${userId}`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
