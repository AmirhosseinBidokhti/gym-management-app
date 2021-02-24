import axios from "axios";
import { API_BASE_URL } from "../config";

export const fileUpload = async (file, fileName) => {
  const formData = new FormData();
  formData.append("form_file", file);
  formData.append("file_name", fileName);

  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.post(
      `${API_BASE_URL}/File/upload`,
      formData,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
