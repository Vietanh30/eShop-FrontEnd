"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

import ChatBotButton from "@/components/button/chatBotBtn";
import ScrollButton from "@/components/button/scrollBtn";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import HomeGrid from "@/components/home-component/homeGrid";
import HomeSlider from "@/components/home-component/homeSlider";
import HomeTitle from "@/components/home-component/homeTitle";
import Slider from "@/components/slider/slider";

import { getAllProductsByCate } from "@/app/api/productApi";

import image1 from "../../src/image/benefit/image1.jpg";
import image2 from "../../src/image/benefit/image2.jpg";
import image3 from "../../src/image/benefit/image3.jpg";
import image4 from "../../src/image/benefit/image4.jpg";
import image5 from "../../src/image/benefit/image5.jpg";

import img1 from "../../src/image/new-product/img1.png";
import img2 from "../../src/image/new-product/img2.png";
import img3 from "../../src/image/new-product/img3.png";
import img4 from "../../src/image/new-product/img4.png";

import laptopImg from "../../src/image/new-product/laptop.png";
import monitorImg from "../../src/image/new-product/monitorImg.png";
import phoneImg from "../../src/image/new-product/phone.jpg";
import tiviImg from "../../src/image/new-product/tivi.jpg";
import watchImg from "../../src/image/new-product/watchImg.png";

import i1 from "../../src/image/accessory/i1.webp";
import i10 from "../../src/image/accessory/i10.webp";
import i11 from "../../src/image/accessory/i11.webp";
import i12 from "../../src/image/accessory/i12.webp";
import i13 from "../../src/image/accessory/i13.webp";
import i14 from "../../src/image/accessory/i14.webp";
import i15 from "../../src/image/accessory/i15.webp";
import i16 from "../../src/image/accessory/i16.webp";
import i17 from "../../src/image/accessory/i17.webp";
import i18 from "../../src/image/accessory/i18.webp";
import i19 from "../../src/image/accessory/i19.webp";
import i2 from "../../src/image/accessory/i2.webp";
import i20 from "../../src/image/accessory/i20.webp";
import i3 from "../../src/image/accessory/i3.webp";
import i4 from "../../src/image/accessory/i4.webp";
import i5 from "../../src/image/accessory/i5.webp";
import i6 from "../../src/image/accessory/i6.webp";
import i7 from "../../src/image/accessory/i7.webp";
import i8 from "../../src/image/accessory/i8.webp";
import i9 from "../../src/image/accessory/i9.webp";
import { getProfile } from "./api/userApi";

const benefitItem = [
  { name: "Sản phẩm", description: "CHÍNH HÃNG", img: image1 },
  { name: "Miễn phí vận chuyển", description: "TOÀN QUỐC", img: image2 },
  { name: "Hotline hỗ trợ", description: "1900.1000", img: image3 },
  { name: "Thủ tục đổi trả", description: "DỄ DÀNG", img: image4 },
];

const newProductItem = [
  { img: img1, link: "/product/samsung-galaxy-s20-fe-256gb-chinh-hang" },
  {
    img: img2,
    link: "/product/macbook-air-13-inch-2020-256gb-chinh-hang-apple-viet-nam-phien-ban-moi",
  },
  { img: img3, link: "/product/xiaomi-redmi-13c-6gb-128gb-chinh-hang" },
  {
    img: img4,
    link: "/product/laptop-asus-vivobook-14-x1404va-nk125w-chinh-hang",
  },
];

const accessoryItem = [
  { name: "Thẻ nhớ - USB", img: i1 },
  { name: "Tai nghe", img: i2 },
  { name: "Sạc dự phòng", img: i3 },
  { name: "Quạt Mini", img: i4 },
  { name: "Loa", img: i5 },
  { name: "Dây đeo đồng hồ", img: i6 },
  { name: "Củ sạc - Dây cáp", img: i7 },
  { name: "Camera an ninh", img: i8 },
  { name: "Apple", img: i9 },
  { name: "Bao da - ốp lưng", img: i10 },
  { name: "Dán màn hình", img: i11 },
  { name: "Phụ kiện Laptop", img: i12 },
  { name: "Camera hành trình", img: i13 },
  { name: "Cân thông minh", img: i14 },
  { name: "Tay cầm", img: i15 },
  { name: "Chuột", img: i16 },
  { name: "Bàn Phím", img: i17 },
  { name: "Thiết bị mạng", img: i18 },
  { name: "Máy lọc không khí", img: i19 },
  { name: "Robot hút bụi", img: i20 },
];

export default function Home() {
  const [phone, setPhone] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [service, setService] = useState([]);
  const [watch, setWatch] = useState([]);
  const [monitor, setMonitor] = useState([]);
  const [tivi, setTivi] = useState([]);
  const [tablet, setTablet] = useState([]);
  const [speakerHead, setSpeakerHead] = useState([]);

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const getUserInfo = await getProfile(token);
        setUserInfo(getUserInfo);
      }

      const phones = await getAllProductsByCate("phone");
      const laptops = await getAllProductsByCate("laptop");
      const services = await getAllProductsByCate("service");
      const watches = await getAllProductsByCate("watch");
      const monitors = await getAllProductsByCate("monitor");
      const tivis = await getAllProductsByCate("tivi");
      const tablets = await getAllProductsByCate("tablet");
      const speakerHeads = await getAllProductsByCate("speakerHeadphone");

      setPhone(phones.slice(50, 75));
      setLaptop(laptops.slice(10, 25));
      setService(services.slice(0, 10));
      setWatch(watches.slice(0, 10));
      setMonitor(monitors.slice(0, 10));
      setTivi(tivis.slice(0, 10));
      setTablet(tablets.slice(0, 10));
      setSpeakerHead(speakerHeads.slice(80, 120));
    })();
  }, []);

  return (
    <>
      <ScrollButton />
      <ChatBotButton />

      <Header />
      <Slider />

      {/* new product */}
      <div className="max-[600px]:hidden flex justify-around items-center mx-24 space-x-2">
        {newProductItem.map((item, index) => (
          <Link href={item.link} key={index}>
            <Image src={item.img} alt="" />
          </Link>
        ))}
      </div>

      {/* phone */}
      {/* <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 my-6 mt-16">
        <Link href="/cate/tecno">
          <Image src={phoneImg} alt="điện thoại nổi bật" />
        </Link>
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Điện thoại nổi bật" href="/cate/phone" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/iphone-15-series"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              iPhone 15
            </Link>
            <Link
              href="/cate/redmi-note-12-series"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              Redmi Note 12
            </Link>
            <Link
              href="/cate/samsung-galaxy-s23"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              Samsung Galaxy S23
            </Link>
            <Link
              href="/cate/phone"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả 
            </Link>
          </div>
        </div>
        <HomeGrid product={phone} />
      </div> */}

      {/* watch */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <Link href="/cate/tecno">
          <Image src={watchImg} alt="đồng hồ nổi bật" />
        </Link>
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Đồng hồ thông minh" href="/cate/watch" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/watch"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeSlider product={watch} perView={2} />
      </div>

      {/* laptop */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <Link href="/cate/msi-gaming">
          <Image src={laptopImg} alt="laptop nổi bật" />
        </Link>
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Laptop nổi bật" href="/cate/laptop" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/product/laptop-asus-tuf-gaming-f15-fx507zc4-hn074w-chinh-hang"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              ASUS TUF Gaming F15
            </Link>
            <Link
              href="/product/laptop-msi-modern-14-c7m-221vn-chinh-hang"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              MSI Modern 14
            </Link>
            <Link
              href="/product/laptop-lenovo-ideapad-3-15aba7-82sg007kvn-chinh-hang"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              Lenovo IdeaPad 5
            </Link>
            <Link
              href="/product/laptop-hp-15s-fq5159tu-7c0s0pa-chinh-hang"
              className="text-xs text-primary_color p-2 bg-white rounded-lg border drop-shadow-sm hover:bg-primary_color hover:text-white"
            >
              HP 15s
            </Link>
            <Link
              href="/cate/laptop"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeGrid product={laptop} />
      </div>

      {/* monitor */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <Link href="/product/man-hinh-msi-pro-mp243x-chinh-hang">
          <Image src={monitorImg} alt="màn hình" />
        </Link>
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Màn hình nổi bật" href="/cate/monitor" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/monitor"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeSlider product={monitor} perView={2} />
      </div>

      {/* tv */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <Link href="/cate/tv-xiaomi">
          <Image src={tiviImg} alt="tv" />
        </Link>
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Smart TV nổi bật" href="/cate/tivi" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/tivi"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeSlider product={tivi} perView={2} />
      </div>

      {/* tablet */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <div className="flex justify-between items-center my-4">
          <HomeTitle title="Tablet" href="/cate/tablet" />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/tablet"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeSlider product={tablet} perView={2} />
      </div>

      {/* speakerHead */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <div className="flex justify-between items-center my-4">
          <HomeTitle
            title="Loa và tai nghe nổi bật"
            href="/cate/speakerHeadphone"
          />

          <div className="max-[600px]:hidden flex justify-between space-x-2">
            <Link
              href="/cate/speakerHeadphone"
              className="text-xs p-2 bg-primary_color rounded-lg border drop-shadow-sm"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
        <HomeSlider product={speakerHead} perView={2} />
      </div>

      {/* service */}
      <div className="max-[600px]:mx-6 max-[600px]:mt-0 mx-24 mt-16">
        <div className="my-4">
          <HomeTitle title="Dịch vụ sửa chữa chính hãng" href="/cate/service" />
        </div>
        <HomeGrid product={service} />
      </div>

      {/* accessory */}
      {/* <div className="max-[600px]:hidden mx-24 my-6 space-y-6">
        <HomeTitle title="Phụ kiện" href="/cate/accessory" />

        <div className="p-6 rounded-lg drop-shadow-lg bg-white space-y-6">
          <div className="grid grid-cols-10 gap-y-6 place-content-between place-items-center text-center">
            {accessoryItem.map((item, index) => (
              <Link
                href="/cate/accessory"
                className="space-y-1 group"
                key={index}
              >
                <Image
                  src={item.img}
                  alt=""
                  className="p-5 rounded-lg bg-[#efefef] mx-auto group-hover:bg-[#fafafa] group-hover:border group-hover:border-primary_color"
                />
                <p className="text-primary_color text-xs group-hover:text-sub_primary_color line-clamp-1">
                  {item.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div> */}

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

      {/* register notification */}
      {/* <div className="max-[600px]:hidden flex justify-around items-center py-8 mx-24">
        <Image src={image5} alt="Đăng ký nhận tin" />
        <div className="flex flex-col items-center space-y-1">
          <p className="text-primary_color font-bold">Đăng ký nhận tin</p>
          <p className="text-xs text-primary_color">
            Đăng ký để nhận những chương trình khuyến mại hot nhất của E-Mobile
          </p>
        </div>
        <div className="flex items-center w-1/3">
          <input
            type="email"
            name="register-notification"
            placeholder="Nhập Email của bạn"
            className="border-2 border-white rounded-l-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
          />
          <div className="cursor-pointer drop-shadow-xl bg-primary_color hover:bg-sub_primary_color py-3 px-3 rounded-r-2xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />
            </svg>
          </div>
        </div>
      </div> */}

      <Footer />
    </>
  );
}
