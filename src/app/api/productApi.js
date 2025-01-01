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
      url: `${host}/api/product/${id}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getProductByCategory = async (id) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/product/cate/${id}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
