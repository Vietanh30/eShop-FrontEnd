"use client";

import ChatBotButton from "@/components/button/chatBotBtn";
import ScrollButton from "@/components/button/scrollBtn";
import Header from "@/components/header/header";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useCart } from "@/hooks/useCart";
import { createOrder } from "../api/orderApi";
import Image from "next/image";

import wishlist from "../../image/cart/wishlist.png";
import Error from "@/components/error/error";
import Footer from "@/components/footer/footer";

export default function Cart() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState(null);
  const { listCart, updateQuantity, removeCart, fetchCart, resetCart } = useCart();
  const [payment, setPayment] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        setToken(userToken);
        const getUserInfo = await getProfile(userToken);
        setUserInfo(getUserInfo);

        fetchCart(userToken);
      }
    })();
  }, []);

  const handleCart = async () => {
    if (payment) {
      const res = await createOrder(token, {
        orderList: JSON.stringify(listCart),
        paymentMethod: payment,
        price: listCart?.reduce((accumulator, current) => {
          const priceNumber = parseFloat(current.price.replace(/,/g, ""));
          return accumulator + (priceNumber * current.quantity);
        }, 0),
      });

      await resetCart(token);
      router.push("/profile")

      Store.addNotification({
        title: "Thành công",
        message: "Xác nhận đặt hàng thành công",
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
      Store.addNotification({
        title: "Theo dõi",
        message: "Vào trang cá nhân để xem thông tin đơn hàng",
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
    } else {
      Store.addNotification({
        title: "Lỗi",
        message: "Vui lòng chọn phương thức thanh toán",
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
    }
  };

  return token ? (
    <>
      <ReactNotifications />
      <ScrollButton />
      <ChatBotButton />

      <Header />

      <p className="font-bold text-primary_color text-lg text-center mt-4">
        GIỎ HÀNG
      </p>

      {listCart && listCart?.length ? (
        <div className="max-[600px]:mx-6 my-2 mb-8 mx-20 flex flex-col items-center">
          <div className="overflow-y-auto h-160 flex flex-col gap-4">
            {listCart?.map((item, index) => (
              <div
                key={index}
                className="flex max-[600px]:flex-col flex-row justify-between border-b-2 border-gray-100 pt-8"
              >
                <div className="flex flex-row gap-x-2 items-center">
                  <svg
                    onClick={() => {
                      removeCart(item?.productId, item?.color, token);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="black"
                    className="cursor-pointer w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                  <img
                    className="max-[600px]:w-16 max-[600px]:h-16 w-32 h-32 rounded-lg"
                    src={item?.image}
                    alt="list"
                  />
                  <div className="flex flex-col gap-y-2 max-[600px]:min-w-[200px] min-w-[320px]">
                    <p className="text-primary_color max-[600px]:line-clamp-1">{item?.name}</p>
                    <p className="text-sm text-primary_color">
                      {(
                        item?.price?.replace(/,/g, "") * item.quantity
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      })}{" "}
                      đ
                    </p>
                    <p className="text-sm text-primary_color">
                      Màu: {item?.color}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-x-2 max-[600px]:justify-around items-center max-[600px]:ml-0 ml-4">
                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(
                          item?.productId,
                          item?.color,
                          item.quantity - 1,
                          token
                        );
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <div className="rounded-2xl px-2 text-primary_color">
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => {
                      updateQuantity(
                        item?.productId,
                        item?.color,
                        item.quantity + 1,
                        token
                      );
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="black"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-4 py-4">
            <p className="max-[600px]:hidden font-semibold text-lg text-primary_color">
              Phương thức thanh toán:
            </p>
            <input
              onChange={() => setPayment("Momo")}
              type="radio"
              id="Momo"
              name="fav_language"
              value="Momo"
            />
            <label
              className="cursor-pointer text-lg font-semibold text-primary_color"
              htmlFor="Momo"
            >
              Momo
            </label>
            <br></br>

            <input
              onChange={() => setPayment("Direct")}
              type="radio"
              id="direct"
              name="fav_language"
              value="direct"
            />
            <label
              className="cursor-pointer text-lg font-semibold text-primary_color"
              htmlFor="direct"
            >
              Trực tiếp
            </label>
            <br></br>
          </div>

          <button
            onClick={handleCart}
            className="text-white font-semibold bg-primary_color w-1/2 rounded-xl py-2 px-4"
          >
            Đặt hàng ngay
          </button>
        </div>
      ) : (
        <div className="flex flex-col text-center justify-center items-center gap-y-4 pt-4">
          <p className="text-sub_primary_color text-sm font-meidum">
            Hiện bạn đang chưa có món hàng nào
          </p>
          <Image className="mx-auto" width={200} src={wishlist} alt="list" />
          <p className="text-sub_primary_color text-sm font-meidum">
            Xem qua các mặt hàng và mua ngay nào!
          </p>
          <button
            className="text-white font-semibold bg-primary_color w-fit rounded-xl p-2 px-6 mb-8"
            onClick={() => {
              router.push("/");
            }}
          >
            Mua hàng ngay
          </button>
        </div>
      )}

      <Footer />
    </>
  ) : <Error />;
}
