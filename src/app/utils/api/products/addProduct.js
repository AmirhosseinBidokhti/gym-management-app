// temporary. later will be added to redux. now i dont have much time.
import axios from "axios";

export const addProduct = async (porductObj) => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data, isSuccess } = await axios.post(
      "https://devking.ir/api/Product/addProduct",
      porductObj,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
