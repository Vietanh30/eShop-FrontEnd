import axios from "axios";

const host = "http://localhost:8000";

export const getAllProducts = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllCates = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/cate`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllCateArr = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/cateArr`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllProductsByCate = async (cate, size = -1) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/${cate}` + (size === -1 ? "" : `?size=${size}`),
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/${slug}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/id/${id}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateProduct = async (id, token, formValue) => {
  try {
    const res = await axios({
      method: "patch",
      url: `${host}/api/product/${id}`,
      data: {
        data: JSON.stringify(formValue)
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
