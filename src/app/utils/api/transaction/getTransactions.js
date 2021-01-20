import axios from "axios";

export const getTransactions = async () => {
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
      "https://devking.ir/api/AccTransaction/getAccTransactions",
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
