import { API } from "../backend";

export const addToUserCart = (
  userId,
  token,
  product_id,
  quantityCount,
  SelectedProductColor,
  SelectedProductSize
) => {
  const formData = new FormData();
  // console.log(item);
  // for (const key in item) {
  formData.append("quantity", quantityCount);
  formData.append("selectedProductColor", SelectedProductColor);
  formData.append("selectedProductSize", SelectedProductSize);
  formData.append("product_id", product_id);
  // }
  console.log(formData);
  return fetch(`${API}usercart/addtocart/${userId}/${token}/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // console.log(response);
        return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
