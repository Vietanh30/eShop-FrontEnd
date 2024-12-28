"use client";

import AdminTab from "@/components/admin/adminTab";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/app/api/productApi";
import Modal from "@mui/material/Modal";
import { updateProduct } from "@/app/api/productApi";
import { useRouter } from "next/navigation";
import Error from "@/components/error/error";
import { Button } from "@mui/material";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [productAll, setProductAll] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [res, setRes] = useState(null);
  const [imgDlt, setImgDlt] = useState(null);
  const [imgAdd, setImgAdd] = useState(null);
  const [openModalDlt, setOpenModalDlt] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [formValue, setformValue] = useState({
    name: "",
    price: "",
    image: [],
  });
  const [userInfo, setUserInfo] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const options = [
    { value: "default", label: "Tất cả", selected: true },
    { value: "phone", label: "Điện thoại" },
    { value: "laptop", label: "Laptop" },
    { value: "tablet", label: "Máy tính bảng" },
    { value: "monitor", label: "Màn hình" },
    { value: "tivi", label: "Tivi" },
    { value: "watch", label: "Đồng hồ" },
    { value: "speakerHeadphone", label: "Âm thanh" },
    { value: "oldProduct", label: "Sản phẩm cũ" },
    { value: "service", label: "Dịch vụ" },
    { value: "accessory", label: "Phụ kiện" },
  ];

  const [token, setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const token_ = localStorage.getItem("user-token");
      setToken(token_)
      const listProducts = await getAllProducts(token_);
      setProductAll(listProducts);
      setProducts(listProducts.slice(0, 10));
      setProductLength(listProducts?.length);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      const listProducts = await getAllProducts(token);
      if (selectedValue === "default") {
        setProductAll(listProducts);
        setProducts(listProducts.slice(0, 10));
        setProductLength(listProducts?.length);
      } else if (selectedValue) {
        const listProductsFilter = listProducts?.filter((item) =>
          item?.cate?.reduce(
            (prev, curr) => prev || curr?.slug === selectedValue,
            false
          )
        );
        setProductAll(listProductsFilter);
        setProducts(listProductsFilter.slice(0, 10));
        setProductLength(listProductsFilter?.length);
      }
    })();
  }, [selectedValue]);

  useEffect(() => {
    setProducts(productAll?.slice((currentPage - 1) * 10, currentPage * 10));
  }, [currentPage]);

  const handleChangeText = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const router = useRouter();

  return token ? (
    <div className="flex flex-row">
      <AdminTab />

      <div className="bg-primary_color/10 h-screen w-[85%] px-20 pt-10">
        <div className="bg-white drop-shadow-lg rounded p-8">
          <div className="flex items-center justify-between">
            <p className="font-bold font-primary text-primary_color text-xl py-4 border-b-2 px-4">
              Sản phẩm
            </p>
            <Button type="primary" onClick={() => setOpenAddProductModal(true)}>Thêm sản phẩm</Button>
            <div className="flex gap-x-2 items-center">
              <p className="text-gray-800 text-sm">Lọc danh mục: </p>
              <div>
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="text-sm text-primary_color border px-2 py-1"
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 text-sm border-b-2 py-2">
            <p className="px-4 font-semibold text-black py-3">ID</p>
            <p className="px-4 font-semibold text-gray-800 py-3">Image</p>
            <p className="px-4 font-semibold text-primary_color py-3">Name</p>
            <p className="px-4 font-semibold text-gray-800 py-3">Price</p>
          </div>
          <div className="h-[400px] overflow-y-auto">
            {products?.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-4 text-sm border-b-2 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setRes(item);
                  setOpenModal(true);
                }}
              >
                <p className="px-4 font-semibold py-3 text-black">{item._id}</p>
                <img src={item.image?.[0]} alt="" width={40} height={40} />
                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {item.name}
                </p>
                <p className="px-4 text-gray-800 py-3">{item.price} đ</p>
              </div>
            ))}
          </div>
          <div className="flex gap-x-3 items-center text-sm">
            <p
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {"<"}
            </p>
            <p className="text-primary_color">{currentPage}</p>
            <p
              onClick={() => {
                if (currentPage < Math.ceil(productLength / 10))
                  setCurrentPage(currentPage + 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {">"}
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(!openModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <div className="flex flex-col mb-4 text-primary_color">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <input
              onChange={handleChangeText}
              className="border py-2 px-3"
              type="text"
              name="name"
              id="name"
              defaultValue={res && res.name}
            ></input>
          </div>

          {/* image */}
          <div className="flex flex-col mb-2">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="image"
            >
              Image
            </label>
            {/* <input
              onChange={handleChangeText}
              className="border py-2 px-3 text-grey-800"
              type="text"
              name="imageUrl"
              id="image"
              defaultValue={res && res.imageUrl}
            /> */}
            <div className="w-full">
              <div className="flex overflow-x-auto gap-x-4">
                {res?.image?.map((item, index) => (
                  <div
                    key={index}
                    className="border-2 border-green-200 rounded-lg relative"
                  >
                    <img src={item} alt="" className="object-cover min-w-[80px] max-w-[80px]" />
                    <img
                      src="https://icons.veryicon.com/png/o/miscellaneous/linear-common-flat-foundation-icon/trash-can-deletion.png"
                      alt=""
                      className="absolute right-0 top-0 h-4 w-4 cursor-pointer "
                      onClick={() => {
                        setImgDlt(item);
                        setOpenModalDlt(true);
                      }}
                    />
                  </div>
                ))}
                <div className="border-2 border-green-200 rounded-lg cursor-pointer">
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/circles-2/100/sign-square-dashed-plus-512.png"
                    alt=""
                    className="object-cover min-w-[80px] max-w-[80px]"
                    onClick={() => setOpenModalAdd(!openModalAdd)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* price */}
          <div className="flex flex-col mb-4 text-primary_color">
            <label
              className="mb-2 font-bold text-lg text-gray-900"
              htmlFor="price"
            >
              Price
            </label>
            <input
              onChange={handleChangeText}
              className="border py-2 px-3"
              type="text"
              name="price"
              id="price"
              defaultValue={res && res.price}
            ></input>
          </div>

          <div>
            <button
              className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded"
              type="submit"
              onClick={async () => {
                const token = localStorage.getItem("user-token");
                await updateProduct(res?._id, token, formValue);
                setOpenModal(!openModal);
                router.push("/admin");
              }}
            >
              Update
            </button>
          </div>
          <div
            className="uppercase text-md font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
            onClick={() => setOpenModal(!openModal)}
          >
            Back
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalDlt}
        onClose={() => setOpenModalDlt(!openModalDlt)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <p className="font-semibold text-primary_color my-4 text-center">
            Xóa hình ảnh này?
          </p>
          <div className="flex items-center justify-around">
            <div
              className="bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg p-2 rounded cursor-pointer"
              onClick={() => {
                setformValue({
                  ...formValue,
                  image: formValue?.image?.filter((item) => item !== imgDlt),
                });
                setRes({
                  ...res,
                  image: res?.image?.filter((item) => item !== imgDlt),
                });
                setOpenModalDlt(!openModalDlt);
              }}
            >
              Delete
            </div>
            <div
              className="uppercase font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
              onClick={() => setOpenModalDlt(!openModalDlt)}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalAdd}
        onClose={() => setOpenModalAdd(!openModalAdd)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <p className="font-semibold text-primary_color my-4 text-center">
            Nhập link ảnh
          </p>

          <input
            onChange={(e) => setImgAdd(e.target.value)}
            className="border py-2 px-3 w-full text-primary_color"
            type="text"
          ></input>

          <div className="flex items-center justify-around">
            <div
              className="bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg p-2 rounded cursor-pointer"
              onClick={() => {
                setformValue({
                  ...formValue,
                  image: [...formValue?.image, imgAdd],
                });
                setRes({
                  ...res,
                  image: [...res?.image, imgAdd],
                });
                setOpenModalAdd(!openModalAdd);
              }}
            >
              Nhập
            </div>
            <div
              className="uppercase font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
              onClick={() => setOpenModalAdd(!openModalAdd)}
            >
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </div>
  ) : <Error />;
}
