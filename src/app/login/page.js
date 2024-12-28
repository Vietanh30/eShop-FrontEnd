"use client";

import Image from "next/image";

import loginObj from "../../../src/image/login/login.png";
import icon from "../../../src/image/logo/icon.png";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "../api/userApi";

export default function Login() {
  const router = useRouter();

  const [formValue, setformValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const res = await signIn(formValue);

    if (res === undefined) {
      return;
    } else if (res.message) {
      Store.addNotification({
        title: "Đăng nhập thất bại",
        message: "Tên đăng nhập hoặc mật khẩu không hợp lệ",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
    } else {
      Store.addNotification({
        title: "Đăng nhập thành công",
        message: "Chào mừng đến với E-Mobile Shop",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      localStorage.setItem("user-token", res.token);
      router.push("/");
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
          <div className="flex items-center gap-x-4">
            <div>
              <p className="text-sm text-black font-bold">CHÀO MỪNG BẠN</p>
            </div>
          </div>
          <div className="pt-6">
            <form className="">
              <div className="relative z-0 w-full mb-3 group">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                />
                <label
                  htmlFor="email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Tên đăng nhập
                </label>
              </div>
              <div className="relative z-0 w-full mb-8 group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-black dark:border-gray-400 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  required
                />
                <label
                  htmlFor="password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Mật khẩu
                </label>
              </div>
              <div
                className="cursor-pointer text-white bg-gradient-to-b from-[#000000] to-[#009981] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm w-full px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleSubmit()}
              >
                ĐĂNG NHẬP
              </div>
            </form>
          </div>
          <div className="flex justify-between text-xs text-black py-3">
            <p>
              Chưa có tài khoản?{" "}
              <span onClick={() => router.push("/signup")} className="cursor-pointer font-medium text-blue-500">
                Đăng ký
              </span>
            </p>
            <p>Quên mật khẩu?</p>
          </div>
        </div>
      </div>
    </>
  );
}
