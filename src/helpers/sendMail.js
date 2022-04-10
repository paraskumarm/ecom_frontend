import { API } from "../backend";

export const sendMail = (msgDetails) => {
  const formData = new FormData();
  for (const key in msgDetails) {
    formData.append(key, msgDetails[key]);
  }
  return fetch(`${API}mail/sendmail/`, {
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
