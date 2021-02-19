// temporary. later will be added to redux. now i dont have much time.

import axios from "axios";
import { API_BASE_URL } from "../config";

export const customerAdd = async (customerObj) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data, isSuccess } = await axios.post(
      `${API_BASE_URL}/Customer/addCustomer`,
      customerObj,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
