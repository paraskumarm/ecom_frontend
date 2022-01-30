import { API } from "../backend";

export const addToUserCart = (userId, token, item) => {
  const formData = new FormData();
  console.log(item);
  for (const key in item) {
    formData.append(key, item[key]);
  }
  console.log(formData);
  return fetch(`${API}cart/add/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      //   return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
