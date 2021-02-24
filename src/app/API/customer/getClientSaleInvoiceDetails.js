import axios from "axios";
import { API_BASE_URL } from "../config";

export const get_client_sale_invoice_details = async (customerID) => {
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
      `${API_BASE_URL}/ClientSessionUsage/get_client_sale_invoice_details?customer_id=${customerID}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
