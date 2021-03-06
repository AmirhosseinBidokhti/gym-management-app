// temporary. later will be added to redux. now i dont have much time.

import axios from "axios";
import { API_BASE_URL } from "../config";

export const updateCustomer = async (newCustomerObj) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data } = await axios.put(
      `${API_BASE_URL}/Customer/updateCustomer`,
      newCustomerObj,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
