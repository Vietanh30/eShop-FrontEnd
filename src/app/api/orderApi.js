import axios from "axios";

const host = "http://localhost:8000";

export const getOrder = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/order`,
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

export const getAllOrder = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/order/all`,
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

export const createOrder = async (token, formValue) => {
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/order/create`,
      data: formValue,
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

export const updateStatus = async (token, status, orderId) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/order/${orderId}`,
      data: {
        status: status
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
