import axios from "axios";
import { API_BASE_URL } from "../config";

export const getTransactions = async () => {
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
      `${API_BASE_URL}/AccTransaction/getAccTransactions`,
      config
    );
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getTransactionsByUserName = async (obj) => {
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
      `${API_BASE_URL}/AccTransaction/getAccTransactions?user_name=${obj.user_name}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getTransactionsByMobile = async (obj) => {
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
      `${API_BASE_URL}/AccTransaction/getAccTransactions?mobile=${obj.mobile}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getTransactionsByTitle = async (obj) => {
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
      `${API_BASE_URL}/AccTransaction/getAccTransactions?title=${obj.title}`,
      config
    );
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
