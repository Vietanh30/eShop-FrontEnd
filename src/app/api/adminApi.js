import axios from "axios";

const host = "http://localhost:8000";

export const createProduct = async (token, formValue) => {
  console.log("form-data::", formValue);
  try {
    // Tạo một đối tượng FormData
    const formData = new FormData();

    formData.append("name", formValue.name);
    formData.append("cate", formValue.cate);
    formData.append("price", formValue.price);
    formData.append("offer", formValue.offer);
    formData.append("color", formValue.color); // Nếu cần gửi dưới dạng JSON
    formData.append("configDesc", formValue.configDesc);
    formData.append("description", formValue.description);

    // Thêm hình ảnh vào FormData
    formValue.images.forEach((file) => {
      formData.append("images", file); // 'images' là tên trường mà server mong đợi
    });

    const res = await axios({
      method: "post",
      url: `${host}/api/product`, // Sửa lại URL (bỏ dấu } thừa)
      data: formData, // Sử dụng formData
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Cập nhật Content-Type
      },
    });
    console.log("createProduct::", res);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
export const updateProduct = async (id, token, formValue) => {
  console.log(formValue);
  try {
    // Tạo một đối tượng FormData
    const formData = new FormData();

    formData.append("name", formValue.name);
    formData.append("cate", formValue.cate);
    formData.append("price", formValue.price);
    formData.append("offer", formValue.offer);
    formData.append("color", formValue.color); // Nếu cần gửi dưới dạng JSON
    formData.append("configDesc", formValue.configDesc);
    formData.append("description", formValue.description);

    // Thêm hình ảnh vào FormData
    formValue.images.forEach((file) => {
      formData.append("images", file); // 'images' là tên trường mà server mong đợi
    });

    const res = await axios({
      method: "patch",
      url: `${host}/api/product/${id}`, // Sửa lại URL (bỏ dấu } thừa)
      data: formData, // Sử dụng formData
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Cập nhật Content-Type
      },
    });
    console.log("response update::", res);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
