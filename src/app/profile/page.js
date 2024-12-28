"use client";

import ChatBotButton from "@/components/button/chatBotBtn";
import ScrollButton from "@/components/button/scrollBtn";
import Header from "@/components/header/header";
import Input from "@/components/input";
import Image from "next/image";

import avadefault from "../../image/login/avadefault.jpg";
import { useEffect, useState } from "react";
import { getProfile } from "../api/userApi";
import { useRouter } from "next/navigation";
import { getOrder } from "../api/orderApi";
import wishlist from "../../image/cart/wishlist.png";
import Error from "@/components/error/error";
import Footer from "@/components/footer/footer";

const description = {
  fullname_des:
    "Tên của bạn xuất hiện trên trang cá nhân và bên cạnh các bình luận của bạn.",
  sex: "Giới tính của bạn Nam(M) / Nữ(F)",
  phone_des: "Điện thoại kết nối với E-Mobile Shop.",
};

export default function Profile() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("profile");

  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const userToken = localStorage.getItem("user-token");
      if (userToken) {
        setToken(userToken);
        const getUserInfo = await getProfile(userToken);
        setUserInfo(getUserInfo);
        setOrders(await getOrder(userToken));
      }
    })();
  }, []);

  return token ? (
    <>
      <ScrollButton />
      <ChatBotButton />

      <Header />

      <div className="max-[600px]:mx-6 max-[600px]:flex-col flex mx-24 my-8">
        <div className="max-[600px]:w-full w-[25%] px-4 flex flex-col gap-y-2 border-r-2 border-gray-50">
          <Image src={avadefault} className="max-[600px]:hidden rounded-full mx-auto" />
          <p className="text-xl font-medium text-primary_color text-center pt-2">
            {userInfo?.name}
          </p>
          <div className="flex max-[600px]:flex-row max-[600px]:items-center max-[600px]:justify-between flex-col gap-y-2">
          <p
            className={`${
              activeTab === "profile"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium py-2 px-2`}
            onClick={() => setActiveTab("profile")}
          >
            Trang cá nhân
          </p>
          <p
            className={`${
              activeTab === "order"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium py-2 px-2`}
            onClick={() => setActiveTab("order")}
          >
            Thông tin đơn hàng
          </p>
          <p
            className={`${
              activeTab === "order" && activeTab === "profile"
                ? "text-primary_color bg-gray-50 rounded-lg"
                : "text-sub_primary_color"
            } cursor-pointer text-sm font-medium py-2 px-2`}
            onClick={() => {
              localStorage.removeItem("user-token");
              router.push("/");
            }}
          >
            Đăng xuất
          </p>
          </div>
        </div>

        {activeTab === "profile" ? (
          <>
            <div className="max-[600px]:px-4 max-[600px]:pt-6 px-8 flex flex-col gap-y-4 max-[600px]:w-full w-[75%] mb-4">
              <p className="text-xl font-bold text-primary_color">
                Trang cá nhân
              </p>

              <Input
                data={userInfo}
                title={"Họ và tên"}
                des={description.fullname_des}
                value={userInfo?.name}
                name="name"
              />
              <Input
                data={userInfo}
                title={"Giới tính"}
                des={description.sex}
                value={userInfo?.gender}
                name="gender"
              />
              <Input
                data={userInfo}
                title={"Email"}
                des={null}
                value={userInfo?.email}
                name="email"
              />
              <Input
                data={userInfo}
                title={"Số điện thoại"}
                des={description.phone_des}
                value={userInfo?.phoneNumber}
                name="phoneNumber"
              />
            </div>
          </>
        ) : (
          <>
            <div className="max-[600px]:px-4 max-[600px]:pt-6 px-8 flex flex-col gap-y-4 max-[600px]:w-full w-[75%] mb-4">
              {orders?.length ? (
                <div className="my-8 mx-8 flex flex-col items-center">
                  <p className="font-primary text-primary_color text-2xl font-bold">
                    ĐƠN HÀNG
                  </p>
                  <div className="overflow-y-auto h-[400px] flex flex-col gap-4 gap-y-6 mt-4 text-primary_color">
                    {orders?.map((item) => (
                      <div
                        key={item._id}
                        className="flex max-[600px]:flex-col max-[600px]:gap-4 justify-between border-b-2 border-gray-100 pt-8"
                      >
                        <div className="flex flex-col flex-wrap gap-4">
                          <p>
                            <b>Mã đơn hàng:</b> {item._id}
                          </p>
                          <p>
                            <b>Phương thức thanh toán:</b> {item.paymentMethod === "Momo" ? item.paymentMethod : "Trực tiếp"}
                          </p>
                        </div>

                        <div className="flex flex-col flex-wrap gap-4">
                          <p>
                            <b>Số tiền:</b>{" "}
                            {item.price.toLocaleString("en-US", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}{" "}
                            VND
                          </p>
                          <p>
                            <b>Tình trạng:</b> {item.paymentStatus === "pending" ? "Đang xử lý" : item.paymentStatus === "paid" ? "Đã xử lý" : "Hủy đơn hàng"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col text-center justify-center items-center gap-y-8 pt-20">
                  <p className="font-primary text-primary_color text-3xl text-bold">
                    Đơn hàng của bạn
                  </p>
                  <p>Hiện bạn đang chưa có đơn hàng nào</p>
                  <img
                    className="ml-8 max-w-[200px]"
                    src={wishlist}
                    alt="list"
                  />
                  <p>Xem qua các mặt hàng và mua ngay nào!</p>
                  <button
                    className="text-white font-semibold bg-primary_color w-fit rounded-xl p-2 px-6"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    Mua hàng ngay
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  ) : <Error />;
}
