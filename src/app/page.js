"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import ScrollButton from "@/components/button/scrollBtn";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HomeGrid from "@/components/home-component/homeGrid";
import HomeSlider from "@/components/home-component/homeSlider";
import HomeTitle from "@/components/home-component/homeTitle";
import Slider from "@/components/slider/slider";

import { getProductByCategory } from "@/app/api/productApi";

import image1 from "../../src/image/benefit/image1.jpg";
import image2 from "../../src/image/benefit/image2.jpg";
import image3 from "../../src/image/benefit/image3.jpg";
import image4 from "../../src/image/benefit/image4.jpg";

import laptopImg from "../../src/image/new-product/laptop.png";
import monitorImg from "../../src/image/new-product/monitorImg.png";
import tiviImg from "../../src/image/new-product/tivi.jpg";
import watchImg from "../../src/image/new-product/watchImg.png";
import { getProfile } from "./api/userApi";
import { getAllCates } from "./api/cateApi";

const benefitItem = [
  { name: "Sản phẩm", description: "CHÍNH HÃNG", img: image1 },
  { name: "Miễn phí vận chuyển", description: "TOÀN QUỐC", img: image2 },
  { name: "Hotline hỗ trợ", description: "1900.1000", img: image3 },
  { name: "Thủ tục đổi trả", description: "DỄ DÀNG", img: image4 },
];

//

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState({}); // Để lưu trữ sản phẩm theo từng danh mục

  useEffect(() => {
    (async () => {
      // const token = localStorage.getItem("user-token");
      // if (token) {
      //   const getUserInfo = await getProfile(token);
      //   setUserInfo(getUserInfo);
      // }
      const fetchedCategories = await getAllCates();
      setCategories(fetchedCategories);

      // Lấy sản phẩm cho từng danh mục
      const productsByCategory = {};
      await Promise.all(
        fetchedCategories.map(async (category) => {
          const products = await getProductByCategory(category._id);
          productsByCategory[category._id] = products; // Lưu sản phẩm theo danh mục
        })
      );

      setProducts(productsByCategory);
    })();
  }, []);
  console.log("categories", categories);
  console.log("products", products);
  return (
    <>
      <ScrollButton />
      {/* <ChatBotButton /> */}

      <Header />
      <Slider />
      {categories &&
        categories.map((category) => {
          return (
            <div
              className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16"
              key={category._id}
            >
              <Link href={category.slug}>
                <Image src={laptopImg} alt="laptop nổi bật" />
              </Link>
              <div className="flex justify-between items-center my-4">
                <HomeTitle
                  title={category.name}
                  href={`cate/${category.slug}`}
                />
                <div className="max-[600px]:hidden flex justify-between space-x-2">
                  <Link
                    href={`cate/${category.slug}`}
                    className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>
              {/* Kiểm tra xem products có tồn tại và có dữ liệu không */}
              <div className="grid max-[600px]:grid-cols-2 grid-cols-5 gap-2">
                {products &&
                  products[category._id] &&
                  products[category._id].map((item, index) => {
                    return <HomeGrid key={index} product={item} />;
                  })}
              </div>
            </div>
          );
        })}
      {/* 
      

      {/* benefit */}
      <div className="max-[600px]:hidden flex justify-around items-center py-4 mx-24">
        {benefitItem.map((item, index) => (
          <div
            className="flex justify-around items-center space-x-2"
            key={index}
          >
            <Image src={item.img} alt={item.name} />
            <div>
              <p className="text-xs text-primary_color font-light">
                {item.name}
              </p>
              <p className="text-sm text-primary_color font-bold">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}
