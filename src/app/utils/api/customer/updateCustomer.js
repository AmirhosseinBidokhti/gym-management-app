// temporary. later will be added to redux. now i dont have much time.

import axios from "axios";

export const updateCustomer = async (newCustomerObj) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    console.log(config);

    const { data } = await axios.post(
      "https://devking.ir/api/Customer/updateCustomer",
      newCustomerObj,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
