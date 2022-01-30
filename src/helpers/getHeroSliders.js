
// import { API } from "../../backend";

import { API } from "../backend";


var requestOptions = {
  method: "GET",
};
export const getHeroSliders = () => {
  return fetch(`${API}slider/`, requestOptions)
    .then((response) => {
      
      let data=response.json();
      data.url="/shop-grid-standard";
      // console.log("DATA",data);
      return data;
    })
    .catch((err) => console.log(err));
};
