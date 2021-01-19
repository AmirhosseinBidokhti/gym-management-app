import axios from "axios";

export const GetCustomerCheckup = async (customerID) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const {
      data: { data },
    } = await axios.get(
      `https://devking.ir/api/Customer/getClientCheckups?customerid=${customerID}`,
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
