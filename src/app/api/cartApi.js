import axios from "axios";

const host = "http://localhost:8000";

export const getCart = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/cart`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateCart = async (token, formValue) => {
  console.log("update", token, formValue);
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/cart/update`,
      data: {
        orderList: formValue,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Change to application/json
      },
    });

    console.log("Response:", res); // Log the entire response object
    return res.data;
  } catch (error) {
    console.error(
      "Error in updateCart:",
      error.response ? error.response.data : error.message
    ); // More informative error logging
    return error.response
      ? error.response.data
      : { message: "An error occurred" };
  }
};
export const removeCart = async (token, id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `${host}/api/cart/remove-item/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
