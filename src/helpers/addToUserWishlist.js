import { API } from "../backend";

export const addToUserWishlist = (
  userId,
  token,
  product_id
) => {
  const formData = new FormData();
  formData.append("product_id", product_id);
  return fetch(`${API}wishlist/addtowishlist/${userId}/${token}/`, {
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
