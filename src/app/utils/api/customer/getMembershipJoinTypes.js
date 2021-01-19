import axios from "axios";

export const getMembershipJoinTypes = async () => {
  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;
    console.log("1");
    console.log(authToken);
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
      "https://devking.ir/api/Customer/getMembershipJoinTypes",
      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
