import axios from "axios";
import { API_BASE_URL } from "../config";

export const getSaleInvoices = async () => {
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
    } = await axios.get(`${API_BASE_URL}/SaleInvoice/getSaleInvoices`, config);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getSaleInvoicesByMobile = async (obj) => {
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
      `${API_BASE_URL}/SaleInvoice/getSaleInvoices?mobile=${obj.mobile}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getSaleInvoicesByLastName = async (obj) => {
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
      `${API_BASE_URL}/SaleInvoice/getSaleInvoices?last_name=${obj.last_name}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export const getSaleInvoicesByFirstName = async (obj) => {
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
      `${API_BASE_URL}/SaleInvoice/getSaleInvoices?first_name=${obj.first_name}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
