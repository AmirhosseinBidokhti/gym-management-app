import axios from "axios";

export const fileUpload = async (file, fileName) => {
  const formData = new FormData();
  formData.append("formFile", file);
  formData.append("fileName", fileName);

  try {
    const authToken = JSON.parse(localStorage.getItem("userInfo")).accessToken;

    const config = {
      headers: {
        "content-type": "application/json; charset=utf-8",
        Authorization: `Bearer ${authToken}`,
      },
    };

    const { data, isSuccess } = await axios.post(
      "https://devking.ir/api/File/upload",
      formData,

      config
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.response);
  }
};
