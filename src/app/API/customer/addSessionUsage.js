import axios from "axios";
import { API_BASE_URL } from "../config";

export const add_client_session_usage = async (session_obj) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).access_token;

    console.log("this is authToken");
    console.log(authToken);

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    console.log("this config object");
    console.log(config);
    const { data } = await axios.post(
      `https://api.imotionfitclub.com/api/ClientSessionUsage/add_client_session_usage`,
      session_obj,
      config
    );
    console.log("this is the data");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};

export function addSessionFetchVersion({
  customer_id,
  sale_invoice_details_id,
  is_use,
}) {
  fetch(
    `${API_BASE_URL}/ClientSessionUsage/add_client_session_usage?customer_id=${customer_id}&sale_invoice_details_id=${sale_invoice_details_id}&is_use=${is_use}`,
    {
      method: "post",
    }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
// `${API_BASE_URL}/ClientSessionUsage/add_client_session_usage?customer_id=${customer_id}&sale_invoice_details_id=${sale_invoice_details_id}&is_use=${is_use}`,
