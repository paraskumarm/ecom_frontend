
// export const userDatahelper = (userId,userData) => {
//   const formData = new FormData();
//   for (const name in userData) {
//     formData.append(name, userData[name]);
//   }
//   const API="http://localhost:8000/api/";
//   return fetch(`${API}user/${userId}/`, {
//     method: "PATCH",
//     body: formData,
//   })
//     .then((response) => {
//       // console.log(response)
//       return response.json();
//     })
//     .catch((err) => console.log(err));

import { API } from "../backend";

// };
export const userDatahelper = (userId,userData) => {
  
  return fetch(`${API}user/${userId}/`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
};

export const getUserDatahelper = (userId) => {
  
  return fetch(`${API}user/${userId}/`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
  .then(response => response.json())
  .catch(error => console.log('error', error));
};



