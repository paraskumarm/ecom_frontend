import Axios from "axios";
import { API } from "../../backend";

export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch products
export const fetchProducts = () => {
  return (dispatch) => {
    Axios.get(`${API}product/`)
      .then((response) => {
        const product = response.data;
        console.log(product);
        for (let i = 0; i < product.length; i++) {
          let image1 = product[i].image1;
          let image2 = product[i].image2;
          let image3 = product[i].image3;
          let image4 = product[i].image4;
          let image5 = product[i].image5;
          let image = [];
          if (image1) image.push(image1);
          if (image2) image.push(image2);
          if (image3) image.push(image3);
          if (image4) image.push(image4);
          if (image5) image.push(image5);
          product[i].image = image;
          product[i].id = String(product[i].id);
        }
        console.log(product);
        dispatch(fetchProductsSuccess(product));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
