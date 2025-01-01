"use client";

import Image from "next/image";
import loginObj from "../../../src/image/login/login.png";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "../api/userApi";

export default function SignUp() {
  const router = useRouter();
  const [formValue, setFormValue] = useState({
    name: "",
    password: "",
    email: "",
    phoneNumber: "",
    gender: "Nam",
  });

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const res = await signUp(formValue);
    if (!res) return;

    const notification = {
      title: res.message ? "Đăng ký thất bại" : "Đăng ký thành công",
      message: res.message || "Chào mừng đến với E-Mobile Shop",
      type: res.message ? "danger" : "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: { duration: 3000, onScreen: true },
    };

    Store.addNotification(notification);

    if (!res.message) {
      router.push("/login");
    }
  };

  return (
    <>
      <ReactNotifications />
      <div className="flex max-[600px]:flex-col">
        <div className="relative max-[600px]:h-[200px] h-screen min-w-[60%] bg-gradient-to-b from-[#FFEACB]/80 to-[#FED085]/80">
          <Image
            src={loginObj}
            alt=""
            className="w-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="mt-16 max-[600px]:mx-0 max-[600px]:px-8 mx-16 w-full">
          <p className="text-sm text-black font-bold">CHÀO MỪNG BẠN</p>
          <form className="pt-6">
            {["name", "password", "email", "phoneNumber"].map((field, i) => (
              <div key={field} className="relative z-0 w-full mb-3 group">
                <input
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  id={field}
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                />
                <label
                  htmlFor={field}
                  className="peer-focus:font-medium peer-focus:mt-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  {field === "name"
                    ? "Tên đăng nhập"
                    : field === "password"
                    ? "Mật khẩu"
                    : field === "email"
                    ? "Email"
                    : "Số điện thoại"}
                </label>
              </div>
            ))}
            <div className="relative z-0 w-full mb-8 group">
              <select
                name="gender"
                id="gender"
                className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                required
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Giới tính khác">Giới tính khác</option>
              </select>
              <label
                htmlFor="gender"
                className="peer-focus:font-medium peer-focus:mt-2 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Giới tính
              </label>
            </div>
            <div
              className="cursor-pointer text-white bg-gradient-to-b from-[#000000] to-[#009981] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              ĐĂNG KÝ
            </div>
          </form>
          <div className="flex justify-between text-xs text-black py-3">
            <p>
              Đã có tài khoản?{" "}
              <span
                onClick={() => router.push("/login")}
                className="cursor-pointer font-medium text-blue-500"
              >
                Đăng nhập
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
