import Axios from "axios";
import { API } from "../../backend";
import uuid from "uuid/v4";
import { addToUserWishlist } from "../../helpers/addToUserWishlist";
import { isAuthenticated } from "../../helpers/auth";
import { deleteFromUserWishlist } from "../../helpers/deleteFromUserWishlist";
import { deleteAllFromUserWishlist } from "../../helpers/deleteAllFromUserWishlist";
import { decreaseFromUserWishlist } from "../../helpers/decreaseFromUserWishlist";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";
export const FETCH_WISHLIST_SUCCESS = "FETCH_WISHLIST_SUCCESS"; //ADDED
// add to wishlist
const UserId = isAuthenticated() && isAuthenticated().user.id;
const token = isAuthenticated() && isAuthenticated().token;
// load cart as same as done to load products
const fetchWishlistSuccess = (wishlist) => ({
  type: FETCH_WISHLIST_SUCCESS,
  payload: wishlist,
});
// fetch cart

// deleteAllFromWishlist
// deleteFromWishlist
export const fetchWishlist = () => {
  let UserId = isAuthenticated() && isAuthenticated().user.id;
  return (dispatch) => {
    if (UserId) {
      Axios.get(`${API}wishlist/?user=${UserId}`)
        .then((response) => {
          let cart = response.data;
          // console.log(cart);
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
            arr[i].cartItemid=cart[i].id;
          }
          // console.log(arr);
          dispatch(fetchWishlistSuccess(arr));
        })
        .catch((error) => {
          console.log("ERROR", error);
        });
    } else {
      // let cart=[]
      dispatch(fetchWishlistSuccess([]));
    }
  };
};
export const addToWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Added To Wishlist", {
        appearance: "success",
        autoDismiss: true,
      });
      let cartid = uuid();
      let usercartid = 0;
      if (UserId) {
        addToUserWishlist(UserId, token, item.id)
          .then((response) => {
            usercartid = response.id;
            console.log(response);
            dispatch({
              type: ADD_TO_WISHLIST,
              payload: item,
              cartItemid: usercartid
            });
          })
          .catch((e) => console.log(e));
      } else {
        dispatch({
          type: ADD_TO_WISHLIST,
          payload: item
        });
      }
    }
    // dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

// delete from wishlist
export const deleteFromWishlist = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed From Wishlist", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (UserId) {
      console.log(item)
      deleteFromUserWishlist(item.cartItemid)
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

//delete all from wishlist
export const deleteAllFromWishlist = (addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Removed All From Wishlist", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    if (UserId) {
      deleteAllFromUserWishlist(UserId)
        .then((response) => console.log(response))
        .catch((e) => console.log(e));
    }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};
