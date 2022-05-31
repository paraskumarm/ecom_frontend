import { API } from "../backend";
import { isAuthenticated } from "./auth";

var requestOptions = {
  method: "GET",
};
export const getOrderHistory = () => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  if(userId)
  return fetch(`${API}orderhistory/?user=${userId}`, requestOptions)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
