import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

import { getAllCates } from "@/app/api/productApi";

import logo from "../../../src/image/logo/logo.png";
import { getProfile } from "@/app/api/userApi";
import { getAllProducts } from "@/app/api/productApi";
import { useRouter } from "next/navigation";

const headerItem = [
  {
    name: "Máy lọc nước RO",
    link: "phone",
  },
  {
    name: "Máy lọc nước nóng lạnh",
    link: "laptop",
  },
  {
    name: "Máy lọc nước Nano",
    link: "tablet",
  },
  {
    name: "Bình lọc nước",
    link: "monitor",
  },
  {
    name: "Phụ kiện máy lọc",
    link: "tivi",
  },
  {
    name: "Lõi lọc nước",
    link: "watch",
  },
  {
    name: "Máy lọc nước không dùng điện",
    link: "speakerHeadphone",
  },
  {
    name: "Máy lọc nước mặn",
    link: "accessory",
  },
];

const viewCate = (cateArr, path) => {
  const cateTitle = cateArr.filter((item) => !item.parent);
  return (
    <div className="flex px-4 space-x-8">
      {cateTitle.map((item, index) => (
        <div className="" key={index}>
          <Link className="text-sub_primary_color" href={`/cate/${item.slug}`}>
            <p className="text-black font-semibold text-sm hover:text-sub_primary_color">
              {item.name.toUpperCase()}
            </p>
          </Link>
          <div className="my-4">
            {cateArr
              .filter(
                (item2) => item2.parent && item2.parent.slug === item.slug
              )
              .map((e, index) => (
                <Link
                  href={`/cate/${e.slug}`}
                  className="text-sub_primary_color"
                  key={index}
                >
                  <p className="text-primary_color text-xs py-1 hover:underline">
                    {e.name}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const [cateList, setCateList] = useState({});

  const [userInfo, setUserInfo] = useState(null);
  const [searchText, setSearchText] = useState(null);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const getUserInfo = await getProfile(token);
        setUserInfo(getUserInfo);
      }

      const res = await getAllCates();
      setCateList(res[0]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (searchText) {
        const listProducts = await getAllProducts();
        setProducts(
          listProducts?.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
          )
        );
      }
    })();
  }, [searchText]);

  return (
    <>
      <div className="min-[600px]:hidden">
        <div className="flex justify-between items-center mx-6 py-4">
          <Link href="/">
            <Image src={logo} alt="E-Mobile Shop" />
          </Link>

          <div className="w-[60%] relative">
            <input
              type="text"
              name="search"
              placeholder="Bạn cần tìm gì ?"
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 rounded-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
            />

            <div className="cursor-pointer drop-shadow-xl bg-gradient-to-t from-primary_color to-sub_primary_color py-3 px-3 rounded-2xl absolute -top-2 right-2">
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {searchText && (
              <div className="absolute w-full top-12 left-0 right-0 h-[200px] flex flex-col gap-y-2 px-2 py-2 overflow-y-auto bg-white rounded-xl z-50">
                {products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl"
                    onClick={() => router.push(`/product/${item.slug}`)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.image?.[0]}
                        width={52}
                        height={52}
                        className="object-cover"
                      />
                      <p className="text-primary_color text-sm line-clamp-2">
                        {item?.name}
                      </p>
                    </div>
                    <p className="text-sub_primary_color text-xs">
                      {item?.price} đ
                    </p>
                  </div>
                ))}
                {!products?.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-[600px]:hidden">
        <div className="flex justify-center bg-primary_color py-1">
          <div className="flex items-center">
            <span className="animate-pulse h-4 w-4 rounded-full bg-white opacity-75"></span>
            <p className="text-xs font-semibold px-3 block">
                CHẤT LƯỢNG HÀNG ĐẦU- GIAO HÀNG TOÀN QUỐC
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mx-24 py-4">
          <Link href="/">
            <Image src={logo} alt="E-Mobile Shop" />
          </Link>

          <div className="w-[45%] relative">
            <input
              type="text"
              name="search"
              placeholder="Bạn cần tìm gì?"
              onChange={(e) => setSearchText(e.target.value)}
              className="border-2 rounded-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
            />

            <div className="cursor-pointer drop-shadow-xl bg-gradient-to-t from-primary_color to-sub_primary_color py-3 px-3 rounded-2xl absolute -top-2 right-2">
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
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>

            {searchText && (
              <div className="absolute w-full top-12 left-0 right-0 h-[200px] flex flex-col gap-y-2 px-2 py-2 overflow-y-auto bg-white rounded-xl z-50">
                {products?.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl"
                    onClick={() => router.push(`/product/${item.slug}`)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.image?.[0]}
                        width={52}
                        height={52}
                        className="object-cover"
                      />
                      <p className="text-primary_color text-sm line-clamp-2">
                        {item?.name}
                      </p>
                    </div>
                    <p className="text-sub_primary_color text-xs">
                      {item?.price} đ
                    </p>
                  </div>
                ))}
                {!products?.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex">
            <div
              onClick={() => {
                userInfo ? router.push("/cart") : router.push("/login");
              }}
              className="cursor-pointer w-28 flex items-center rounded-lg bg-primary_color p-2 space-x-2 border-2 border-primary_color mr-4"
            >
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
                <circle cx="10" cy="20.5" r="1" />
                <circle cx="18" cy="20.5" r="1" />
                <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
              </svg>
              <p className="text-xs font-medium">Giỏ hàng</p>
            </div>
            <Link
              href={userInfo ? "/profile" : "/login"}
              className="w-28 flex items-center rounded-lg bg-white p-2 space-x-2 border-2 border-primary_color"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00483D"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <p className="text-xs font-medium text-primary_color line-clamp-1">
                {userInfo ? userInfo?.name?.split(" ").pop() : "Đăng nhập"}
              </p>
            </Link>
          </div>
        </div>

        {/* navigator */}
        <div className="flex justify-around items-center mx-24 my-2 bg-primary_color rounded-lg relative ">
          {headerItem.map((item, index) => (
            <Link
              href={`/cate/${item.link}`}
              className="group cursor-pointer flex flex-col items-center space-y-3 py-2"
              key={index}
            >
              {item.icon}
              <p className="px-2 text-xs font-medium group-hover:font-semibold group-hover:underline group-hover:underline-offset-2 group-hover:decoration-4 group-hover:decoration-[#f7941e]">
                {item.name.toUpperCase()}
              </p>

              <div className="absolute hidden group-hover:block left-0 top-14 w-full z-50">
                <div className="drop-shadow-2xl rounded p-3 my-1 bg-white">
                  {Object.keys(cateList ?? {}).length
                    ? viewCate(cateList[item.link], item.link)
                    : null}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
