import axios from "axios";

const host = "http://localhost:8000";

export const sendMessage = async (token, prompt) => {
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/message`,
      data: { prompt: prompt },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

export const getMessage = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/message`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
