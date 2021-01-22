import axios from "axios";

export const getSaleInvoiceTypes = async () => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    console.log(config);

    const {
      data: { data },
    } = await axios.get(
      "https://devking.ir/api/SaleInvoice/getSaleInvoicePaymentTypes",
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
