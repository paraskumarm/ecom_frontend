import { API } from "../backend";
import { DELETE_ALL_FROM_CART } from "../redux/actions/cartActions";

export const signup = (user) => {
  user.name = user.username;
  return fetch(`${API}user/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (user) => {
  const { email, password } = user;
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  for (var key of formData.keys()) {
    console.log("MYKEY: ", key);
  }

  return fetch(`${API}user/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // console.log("LOGIN RESPONSE: ", response);
      localStorage.removeItem("redux_localstorage_simple");
      
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    //compare jwt with database json token
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const signout = (next) => {
  const UserId = isAuthenticated() && isAuthenticated().user.id;
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    localStorage.removeItem("redux_localstorage_simple");
    // cartEmpty(() => {});
    // next();
    return fetch(`${API}user/logout/${UserId}`, { method: "GET" })
      .then((response) => {
        console.log("Signout success", response);
        window.location.reload();
        next();
        // return (dispatch) => {
          
        //   // make delete request on cart api
        //   dispatch({ type: DELETE_ALL_FROM_CART });
         
        // };
        
      })
      .catch((err) => console.log(err));
  }
};
