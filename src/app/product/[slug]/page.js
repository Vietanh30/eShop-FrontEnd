"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Slider from "@/components/slider/slider";
import HomeTitle from "@/components/home-component/homeTitle";
import ScrollButton from "@/components/button/scrollBtn";
import ChatBotButton from "@/components/button/chatBotBtn";
import HomeGrid from "@/components/home-component/homeGrid";
import Benefit from "@/components/benefit/benefit";
import NavProd from "@/components/product-component/navProd";
import ProductSlider from "@/components/product-component/productSlider";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { useCart } from "@/hooks/useCart";

import { getProductBySlug } from "@/app/api/productApi";

export default function Product() {
  const productSlug = usePathname().split("/")[2];
  const [product, setProduct] = useState(null);
  const [colorPicker, setColorPicker] = useState(null);
  const { listCart, addCart, removeCart, fetchCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const prod = await getProductBySlug(productSlug);
      setProduct(prod);
    })();
  }, []);

  const handleCart = async () => {
    const token = localStorage.getItem("user-token");
    if (!token) {
      router.push("/login");
    } else {
      if (colorPicker) {
        addCart(
          {
            productId: product?._id,
            name: product?.name,
            image: product?.image?.[0] ?? "",
            color: colorPicker,
            price: product?.price,
            quantity: 1,
          },
          token
        );
        console.log("===> cart: ", listCart);
        Store.addNotification({
          title: "Thành công",
          message: "Đã thêm sản phẩm vào giỏ hàng",
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
          message: "Vui lòng chọn màu/phiên bản mua",
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
    }
  };

  return (
    <>
      <ReactNotifications />
      <ScrollButton />
      <ChatBotButton />

      <Header />
      {/* <Slider /> */}

      <NavProd listCate={product} />

      {/* main content */}
      <div className="max-[600px]:mx-6 mx-24 my-8">
        <p className="text-black font-bold text-xl pb-4">{product?.name}</p>

        <div className="flex max-[600px]:flex-col space-x-2">
          <ProductSlider product={product} />

          <div className="max-[600px]:w-full w-1/2">
            <div className="flex items-end gap-x-4">
              <p className="max-[600px]:text-lg text-2xl text-[#fd475a] font-bold">
                {product &&
                  (product.price[0] === "L"
                    ? product.price
                    : product.price + " đ")}
              </p>
              <p className="max-[600px]:text-sm text-base text-primary_color line-through italic">
                {product &&
                  product.price[0] !== "L" &&
                  (
                    (parseInt(product.price.replace(/,/g, ""), 10) * 3) /
                    2
                  ).toString() + " ₫"}
              </p>
              <p className="max-[600px]:text-xs text-sm text-primary_color italic">
                <span className="px-1">|</span> Giá Đã bao gồm 10% VAT
              </p>
            </div>
            <p className="text-sm font-medium text-primary_color py-2">
              Lựa chọn màu còn hàng:
            </p>
            <div className="grid grid-cols-4 gap-1 my-2">
              {product &&
                product.color.map((item, index) => (
                  <div
                    className="rounded-lg border border-[#ddd] hover:border-yellow-400 px-1 py-2 bg-white"
                    key={index}
                  >
                    <div className="flex items-center gap-x-2">
                      <input
                        type="radio"
                        name="color"
                        value={item}
                        onChange={(e) => setColorPicker(e?.target?.value)}
                      />
                      <p className="text-sm text-primary_color">{item}</p>
                    </div>
                    <p className="text-sm text-[#fd475a] font-bold">
                      {product.price}
                    </p>
                  </div>
                ))}
            </div>
            <div
              onClick={handleCart}
              className="cursor-pointer py-2 bg-gradient-to-t hover:bg-gradient-to-b from-primary_color to-sub_primary_color rounded font-bold text-center"
            >
              MUA NGAY
            </div>

            <div className="bg-white rounded px-2 py-3 mt-2">
              <p className="font-bold text-sm text-black">ƯU ĐÃI THANH TOÁN</p>
              {product?.offer.map((item, index) => (
                <div
                  key={index}
                  className="text-xs text-primary_color py-1 flex gap-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#009a82"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <p className="w-[90%]">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-[600px]:w-full max-[600px]:mt-2 w-1/4 bg-white rounded-xl py-4 px-2">
            <p className="text-black font-bold text-sm pb-4">
              {product?.configTitle}
            </p>
            <Image
              src={product?.configImage}
              width={240}
              height={240}
              alt={product?.configTitle}
              className="mx-auto"
            />
            <div className="text-sub_primary_color font-bold text-sm my-4 py-2 px-3 border border-sub_primary_color rounded flex justify-between items-center w-3/5 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#009a82"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
              <p>Cấu hình chi tiết</p>
            </div>
            <div className="space-y-2">
              {product &&
                product.configDesc &&
                Object.entries(product.configDesc).map((item, index) => (
                  <p
                    className="text-primary_color font-semibold text-xs"
                    key={index}
                  >
                    {item[0]} <span className="font-normal">{item[1]}</span>
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* description */}
      <div className="max-[600px]:mx-6 mx-24 my-8">
        <div className="bg-white rounded py-4 px-4 text-sm">
          {product &&
            product.description &&
            product.description.map(function (item, index) {
              if (item.slice(0, 5) === "https")
                return (
                  <Image
                    src={item}
                    alt={item}
                    key={index}
                    width={500}
                    height={500}
                  />
                );
              else if (item !== "●")
                return (
                  <p
                    key={index}
                    className="text-normal font-base text-primary_color py-1"
                  >
                    {item}
                  </p>
                );
            })}
        </div>
      </div>

      {/* similar product */}
      <div className="max-[600px]:mx-6 mx-24 my-8">
        <div className="my-4">
          <HomeTitle title="Sản phẩm tương tự" href="/" />
        </div>
        <HomeGrid product={product?.similarProduct} />
      </div>

      {/* news */}
      {product && product.news && (
        <div className="max-[600px]:mx-6 mx-24 my-8">
          <div className="my-4">
            <HomeTitle
              title={product && product.news && product.news.name}
              href="/"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.news.subNews.map((item, index) => (
              <div
                key={index}
                className="rounded bg-white drop-shadow py-2 px-2 flex items-center justify-between gap-x-2 cursor-pointer"
              >
                <Image src={item.img} alt={item.name} width={50} height={50} />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-primary_color">
                    {item.name}
                  </p>
                  <p className="text-xs italic text-primary_color">
                    {item.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Benefit />

      <Footer />
    </>
  );
}
