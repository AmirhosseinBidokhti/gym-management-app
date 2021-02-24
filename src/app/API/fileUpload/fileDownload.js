//import axios from "axios";
import { API_BASE_URL } from "../config";

// export const fileDownload = async (filePath) => {
//   try {
//     const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

//     const config = {
//       responseType: "blob",
//       headers: {
//         //"content-type": "application/json; charset=utf-8",

//         Authorization: `Bearer ${authToken}`,
//       },
//     };

//     const { data, isSuccess } = await axios.get(
//       `${API_BASE_URL}/File/download?file=${filePath}`,

//       config
//     );
//     let downloadUrl = window.URL.createObjectURL(
//       new Blob([data], { type: "image/jpeg" })
//     );
//     downloadUrl = downloadUrl.replace(
//       "blob:http://localhost:3000/",
//       "blob:https://api.imotionfitclub.com/"
//     );
//     console.log(data);
//     console.log(downloadUrl);
//     window.open(downloadUrl);
//     window.location.href = downloadUrl;
//   } catch (error) {
//     console.log(error.response);
//   }
// };

export const fileDownload_v2 = (filePath) => {
  const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;
  console.log(authToken);
  fetch(`${API_BASE_URL}/File/download?file=${filePath}`, {
    method: "Get",
    headers: new Headers({
      Authorization: `Bearer ${authToken}`,
    }),
  }).then((response) => {
    if (!response.ok) {
      // make the promise be rejected if we didn't get a 2xx response
      alert("Resource was not found!");
      return;
    }

    response
      .blob()
      .then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = `${filePath}`;
        a.click();
      })
      .catch((err) => console.log(err));
    //window.location.href = response.url;
  });
};
