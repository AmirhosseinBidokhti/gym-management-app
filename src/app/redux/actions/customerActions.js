import {
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_ADD_REQUEST,
  CUSTOMER_ADD_SUCCESS,
  CUSTOMER_ADD_FAIL,
} from "../constants/customerConstants";

import axios from "axios";

// export const listCustomers = () => async (dispatch) => {
//   try {
//     dispatch({
//       type: CUSTOMER_LIST_REQUEST,
//     });

//     const authToken = json.parse(localStorage.getItem("userInfo")).access_token;

//     const config = {
//       header: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${authToken}`,
//       },
//     };

//     const { data } = await axios.post(
//       "https://devking.ir/api/Account/login",
//       { username, password },
//       config
//     );
//   } catch (error) {}
// };
