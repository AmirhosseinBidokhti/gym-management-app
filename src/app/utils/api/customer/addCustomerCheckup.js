// temporary. later will be added to redux. now i dont have much time.

import axios from "axios";

export const addCustomerCheckup = async (checkupObj) => {
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
      "https://devking.ir/api/Customer/addCheckup",
      checkupObj,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
