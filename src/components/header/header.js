import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import logo from "../../../src/image/logo/logo.png";
import { getProfile } from "@/app/api/userApi";
import { getAllProducts } from "@/app/api/productApi";
import { useRouter } from "next/navigation";
import { getAllCates } from "@/app/api/cateApi";

// Component to display categories

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        const user = await getProfile(token);
        setUserInfo(user);
      }
      const categoryList = await getAllCates();
      setCategories(categoryList);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchText) {
        const allProducts = await getAllProducts();
        console.log(allProducts);
        const filteredProducts = allProducts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.price.toLowerCase().includes(searchText.toLowerCase())
        );
        setProducts(filteredProducts);
      }
    };
    fetchProducts();
  }, [searchText]);

  const handleSearchChange = (e) => setSearchText(e.target.value);

  const handleProductSelect = (slug) => {
    router.push(`/product/${slug}`);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="min-[600px]:hidden">
        <div className="flex justify-between items-center mx-6 py-4">
          <Link href="/">
            <Image src={logo} alt="E-Mobile Shop" />
          </Link>
          <div className="w-[60%] relative">
            <input
              type="text"
              placeholder="Bạn cần tìm gì ?"
              onChange={handleSearchChange}
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
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl"
                    onClick={() => handleProductSelect(item.slug)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.name}
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
                {!products.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="max-[600px]:hidden">
        <div className="flex justify-center bg-primary_color py-1">
          <div className="flex items-center">
            <span className="animate-pulse h-4 w-4 rounded-full bg-white opacity-75"></span>
            <p className="text-xs font-semibold px-3 block">
              CHẤT LƯỢNG HÀNG ĐẦU - GIAO HÀNG TOÀN QUỐC
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
              placeholder="Bạn cần tìm gì?"
              onChange={handleSearchChange}
              className="border-2 rounded-xl font-medium text-sm p-3 drop-shadow-xl focus:outline-none focus:text-primary_color w-full"
            />
            <div className="cursor-pointer drop-shadow-xl bg-gradient-to-t from-primary_color to-sub_primary_color py-3 px-3 rounded-2xl absolute -top-0 right-0">
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
              <div className="absolute w-full top-12 left-0 right-0 max-h-[500px] flex flex-col gap-y-2 px-2 py-2 overflow-y-auto bg-white rounded-xl z-50">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between cursor-pointer hover:border-2 hover:rounded-xl hover: px-2"
                    onClick={() => handleProductSelect(item.slug)}
                  >
                    <div className="flex justify-between items-center">
                      <Image
                        src={item?.image?.[0]}
                        alt={item?.name}
                        width={52}
                        height={52}
                        className="object-cover w-14 h-14"
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
                {!products.length && (
                  <p className="text-sub_primary_color text-sm">
                    Không có sản phẩm phù hợp với từ khóa trên
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex">
            <div
              onClick={() => router.push(userInfo ? "/cart" : "/login")}
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
                {userInfo ? userInfo.name : "Đăng nhập"}
              </p>
            </Link>
          </div>
        </div>

        {/* Category Navigator */}
        <div className="flex justify-around items-center mx-24 my-2 bg-primary_color rounded-lg relative">
          {categories.map((item) => (
            <Link
              href={`/cate/${item.slug}`}
              className="group cursor-pointer flex flex-col items-center space-y-3 py-2"
              key={item.slug}
            >
              <p className="px-2 text-xs font-medium group-hover:font-semibold group-hover:underline group-hover:underline-offset-2 group-hover:decoration-4 group-hover:decoration-[#f7941e]">
                {item.name.toUpperCase()}
              </p>
              {/* <div className="absolute hidden group-hover:block left-0 top-14 w-full z-50">
                <div className="drop-shadow-2xl rounded p-3 my-1 bg-white">
                  <CategoryView categories={categories} />
                </div>
              </div> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
