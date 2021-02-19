// temporary. later will be added to redux. now i dont have much time.

import axios from "axios";
import { API_BASE_URL } from "../config";

export const deleteCustomerCheckup = async (id) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    console.log(config);

    const { data } = await axios.delete(
      `${API_BASE_URL}/Customer/deleteCheckup?id=${id}`,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
