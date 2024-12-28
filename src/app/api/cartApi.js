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
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/cart/update`,
      data: {
        orderList: JSON.stringify(formValue)
      },
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
