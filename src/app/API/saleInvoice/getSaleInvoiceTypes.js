import axios from "axios";
import { API_BASE_URL } from "../config";

export const getSaleInvoiceTypes = async () => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    //console.log(config);

    const {
      data: { data },
    } = await axios.get(
      `${API_BASE_URL}/SaleInvoice/getSaleInvoicePaymentTypes`,
      config
    );
    // console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
