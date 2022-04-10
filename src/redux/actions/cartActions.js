import Axios from "axios";
import { API } from "../../backend";
import uuid from "uuid/v4";
import { addToUserCart } from "../../helpers/addToUserCart";
import { isAuthenticated } from "../../helpers/auth";
import { deleteFromUserCart } from "../../helpers/deleteFromUserCart";
import { deleteAllFromUserCart } from "../../helpers/deleteAllFromUserCart";
import { decreaseFromUserCart } from "../../helpers/decreaseFromUserCart";
// import { getCartUrl } from "../../helpers/getCartUrl";

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const FETCH_CART_SUCCESS = "FETCH_CART_SUCCESS"; //ADDED
const UserId = isAuthenticated() && isAuthenticated().user.id;
const token = isAuthenticated() && isAuthenticated().token;
// load cart as same as done to load products
const fetchCartSuccess = (cart) => ({
  type: FETCH_CART_SUCCESS,
  payload: cart,
});
// fetch cart
export const fetchCart = () => {
  let UserId = isAuthenticated() && isAuthenticated().user.id;
  return (dispatch) => {
    if (UserId) {
      Axios.get(`${API}usercart/?user=${UserId}`)
        .then((response) => {
          let cart = response.data;

          for (let i = 0; i < cart.length; i++) {
            let image = [];
            let image1 = cart[i].product.image1;
            let image2 = cart[i].product.image2;
            let image3 = cart[i].product.image3;
            let image4 = cart[i].product.image4;
            let image5 = cart[i].product.image5;
            if (image1) image.push(image1);
            if (image2) image.push(image2);
            if (image3) image.push(image3);
            if (image4) image.push(image4);
            if (image5) image.push(image5);
            cart[i].product.image = image;
          }
          let arr = [];
          for (let i = 0; i < cart.length; i++) {
            arr[i] = cart[i].product;
            arr[i].selectedProductColor = cart[i].selectedProductColor;
            arr[i].selectedProductSize = cart[i].selectedProductSize;
            arr[i].quantity = cart[i].quantity;
            arr[i].id = cart[i].product.id;
            arr[i].cartItemId = String(cart[i].id);
            let size = [];
            if (cart[i].variation[0].stockS) {
              let obj1 = {};
              obj1.name = "S";
              obj1.stock = cart[i].variation[0].stockS;
              size.push(obj1);
            }
            if (cart[i].variation[0].stockM) {
              let obj1 = {};
              obj1.name = "M";
              obj1.stock = cart[i].variation[0].stockM;
              size.push(obj1);
            }
            if (cart[i].variation[0].stockL) {
              let obj1 = {};
              obj1.name = "L";
              obj1.stock = cart[i].variation[0].stockL;
              size.push(obj1);
            }
            if (cart[i].variation[0].stockXL) {
              let obj1 = {};
              obj1.name = "XL";
              obj1.stock = cart[i].variation[0].stockXL;
              size.push(obj1);
            }
            arr[i].product.variation[0].size=size;
          }

          dispatch(fetchCartSuccess(arr));
        })
        .catch((error) => {
          console.log("ERROR",error);
        });
    } else {
      // let cart=[]
      dispatch(fetchCartSuccess([]));
    }
  };
};

//add to cart

export const addToCart = (
  item,
  addToast,
  quantityCount,
  selectedProductColor,
  selectedProductSize
) => {
  let cartid = uuid();
  let usercartid = 0;

  return (dispatch) => {
    //redux thunk
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
    if (UserId) {
      addToUserCart(
        UserId,
        token,
        item.id,
        quantityCount,
        selectedProductColor,
        selectedProductSize
      )
        .then((response) => {
          usercartid = response.id;
          dispatch({
            type: ADD_TO_CART,
            payload: {
              ...item,
              quantity: quantityCount,
              selectedProductColor: selectedProductColor
                ? selectedProductColor
                : item.selectedProductColor
                ? item.selectedProductColor
                : null,
              selectedProductSize: selectedProductSize
                ? selectedProductSize
                : item.selectedProductSize
                ? item.selectedProductSize
                : null,
            },
            cartItemid: usercartid,
          });
        })
        .catch((e) => console.log(e));
    } else {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          ...item,
          quantity: quantityCount,
          selectedProductColor: selectedProductColor
            ? selectedProductColor
            : item.selectedProductColor
            ? item.selectedProductColor
            : null,
          selectedProductSize: selectedProductSize
            ? selectedProductSize
            : item.selectedProductSize
            ? item.selectedProductSize
            : null,
        },
        cartItemid: cartid,
      });
    }
    
  };
};
//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  if (UserId) {
    decreaseFromUserCart(UserId, item.cartItemId)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }

  return (dispatch) => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    //make only delete request to cart api no need to modify redux store
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  if (UserId) {
    deleteFromUserCart(item.cartItemId)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  }
  return (dispatch) => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  if (UserId) {
    deleteAllFromUserCart(UserId)
      .then((response) => console.log(response))
      .catch((e) => console.log(e));
  }
  return (dispatch) => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    // make delete request on cart api
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item, color, size) => {
  if (item.stock) {
    return item.stock;
  } else {
    return item.variation
      .filter((single) => single.color === color)[0]
      .size.filter((single) => single.name === size)[0].stock;
  }
};
