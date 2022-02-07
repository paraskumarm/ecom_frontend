import { API } from "../backend";

export const increaseUserCart = (quantity, cartid) => {
  return fetch(`${API}usercart/${cartid}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quantity),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
