import { API } from "../backend";

export const postAddress = (userId, billingDetails) => {
  const formData = new FormData();
  for (const key in billingDetails) {
    formData.append(key, billingDetails[key]);
  }
  return fetch(`${API}address/add/${userId}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

