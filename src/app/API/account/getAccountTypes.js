import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAccountTypes = async () => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const {
      data: { data },
    } = await axios.get(`${API_BASE_URL}/AccAccount/get_account_types`, config);
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
    console.log(error);
  }
};
