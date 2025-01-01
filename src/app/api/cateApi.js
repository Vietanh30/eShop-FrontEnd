import axios from "axios";

const host = "http://localhost:8000";
export const getAllCates = async () => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/categories`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const getProductBySlugCate = async (slug) => {
  try {
    const res = await axios({
      method: "get",
      url: `${host}/api/categories/${slug}`,
    });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
