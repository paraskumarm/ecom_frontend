import { API } from "../backend";
var requestOptions = {
  method: "GET",
};
export const deleteAllFromUserCart = (userid) => {
  return fetch(`${API}usercart/deleteall/${userid}/`, requestOptions)
    .then((response) => {
      let data = response.json();
      return data;
    })
    .catch((err) => console.log(err));
};
