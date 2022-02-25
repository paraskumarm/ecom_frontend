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
          let size = [];
          if (product[i].variation[0].stockS) {
            let obj1 = {};
            obj1.name = "S";
            obj1.stock = product[i].variation[0].stockS;
            size.push(obj1);
          }
          if (product[i].variation[0].stockM) {
            let obj2 = {};
            obj2.name = "M";
            obj2.stock = product[i].variation[0].stockM;
            size.push(obj2);
          }
          if (product[i].variation[0].stockL) {
            let obj3 = {};
            obj3.name = "L";
            obj3.stock = product[i].variation[0].stockL;
            size.push(obj3);
          }
          if (product[i].variation[0].stockXL) {
            let obj4 = {};
            obj4.name = "XL";
            obj4.stock = product[i].variation[0].stockXL;
            size.push(obj4);
          }
          product[i].variation[0].size = size;
          // if(product[i].variation.stockS>0){
          //   product[i].variation.size.S=product[i].variation.stockS;
          // }
          // if(product[i].variation.stockM>0){

          //   product[i].variation.size.name="M";
          //   product[i].variation.size.=product[i].variation.stockM;
          // }
          // if(product[i].variation.stockL>0){
          //   product[i].variation.size.L=product[i].variation.stockL;
          // }
          // if(product[i].variation.stockXL>0){
          //   product[i].variation.size.XL=product[i].variation.stockXL;
          // }
        }
        console.log(product);
        dispatch(fetchProductsSuccess(product));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
