import axios from "axios";
import { API_BASE_URL } from "../config";

export const getAccounts = async () => {
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
    } = await axios.get(`${API_BASE_URL}/AccAccount/get_accounts`, config);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getAccountsByTitle = async (title) => {
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
    } = await axios.get(
      `${API_BASE_URL}/AccAccount/get_accounts?title=${title}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
export const getAccountsByType = async (accObj) => {
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
    } = await axios.get(
      `${API_BASE_URL}/AccAccount/get_accounts?account_type_id=${accObj.account_type_id}`,
      config
    );
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
