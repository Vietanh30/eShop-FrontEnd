import axios from "axios";

const host = "http://localhost:8000";

export const getOrder = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/order`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
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
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createOrder = async (token, formValue) => {
  console.log("formValue", formValue);
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/order`,
      data: formValue,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    // Kiểm tra xem có phản hồi không và trả về thông báo lỗi phù hợp
    if (error.response) {
      console.error("Error response:", error.response.data);
      return error.response.data; // Trả về dữ liệu từ phản hồi lỗi
    } else if (error.request) {
      console.error("Error request:", error.request);
      return { message: "No response received from server." }; // Không có phản hồi
    } else {
      console.error("Error message:", error.message);
      return { message: error.message }; // Lỗi khác
    }
  }
};

export const updateStatus = async (token, status, orderId) => {
  console.log(token, status, orderId);
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/order/${orderId}`,
      data: {
        status: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error.response.data;
  }
};
export const cancelOrder = async (token, orderId) => {
  console.log(token, orderId);
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/order/cancel/${orderId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error.response.data;
  }
};
