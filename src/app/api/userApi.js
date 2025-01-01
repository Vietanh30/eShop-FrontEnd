import axios from "axios";

const host = "http://localhost:8000";

export const signIn = async (formValue) => {
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/user/auth`,
      data: formValue,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const signUp = async (formValue) => {
  try {
    const res = await axios({
      method: "post",
      url: `${host}/api/user/register`,
      data: formValue,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProfile = async (token) => {
  try {
    const res = await axios.get(`${host}/api/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProfile = async (token, formValue) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/user/update`,
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

export const getAllProfile = async (token) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/user/all`,
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateRole = async (token, status, userId) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/user/role/${userId}`,
      data: {
        status: status,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
