"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Slider from "@/components/slider/slider";
import HomeTitle from "@/components/home-component/homeTitle";
import ScrollButton from "@/components/button/scrollBtn";
import ChatBotButton from "@/components/button/chatBotBtn";
import Benefit from "@/components/benefit/benefit";
import NavCate from "@/components/cate-component/navCate";
import FilterCate from "@/components/cate-component/filterCate";

import {
  getAllProductsByCate,
  getAllCates,
  getAllCateArr,
} from "@/app/api/productApi";

export default function Cate() {
  const getCateSequence = (pathname, cates) => {
    let res = [];
    while (true) {
      const item = res.length
        ? cates.filter((e) => e.slug === res[res.length - 1].parent.slug)[0]
        : cates.filter((e) => e.slug === pathname)[0];
      res.push(item);

      if (!item.parent) break;
    }

    return res;
  };

  const getCateNameFromCurrCate = (currCate, cateArr) => {
    let res = cateArr.filter((e) => e.slug === currCate)[0];
    while (res?.parent) {
      res = cateArr.filter((e) => e.slug === res.parent.slug)[0];
    }
    return res;
  };

  const searchParams = useSearchParams();
  let _sort = searchParams.get("_sort");
  if (_sort !== "asc" && _sort !== "des") _sort = "";
  let _filter = searchParams.get("_filter");
  if (_filter !== "min5" && _filter !== "max5") _filter = "";

  const currCate = usePathname().split("/")[2];
  const [product, setProduct] = useState([]);
  const [productCst, setProductCst] = useState([]);
  const [listCateSequences, setListCateSequences] = useState([]);

  useEffect(() => {
    (async () => {
      const cates = await getAllCates();
      const cateArr = await getAllCateArr();
      const bigCate = getCateNameFromCurrCate(currCate, cateArr);

      const products = await getAllProductsByCate(bigCate?.bigSlug);
      console.log(bigCate);
      let newProducts = products?.filter((product) =>
        product.cate.some((e) => e.slug === currCate)
      );
      setProduct(newProducts);
      setProductCst(newProducts);

      const listCateSequence = getCateSequence(
        currCate,
        cates[0][bigCate.bigSlug]
      );
      setListCateSequences(listCateSequence);
    })();
  }, []);

  useEffect(() => {
    setProduct(
      _sort
        ? _sort === "asc"
          ? productCst.sort(
              (a, b) =>
                parseInt(b.price.replace(/,/g, ""), 10) -
                parseInt(a.price.replace(/,/g, ""), 10)
            )
          : productCst.sort(
              (a, b) =>
                parseInt(a.price.replace(/,/g, ""), 10) -
                parseInt(b.price.replace(/,/g, ""), 10)
            )
        : productCst
    );

    setProduct(
      _filter
        ? _filter === "min5"
          ? productCst.filter(
              (e) => parseInt(e.price.replace(/,/g, ""), 10) <= 5000000
            )
          : productCst.filter(
              (e) => parseInt(e.price.replace(/,/g, ""), 10) > 5000000
            )
        : productCst
    );
  }, [_sort, _filter]);

  return (
    <>
      <ScrollButton />
      <ChatBotButton />

      <Header />
      {/* <Slider /> */}

      <NavCate listCate={[...listCateSequences].reverse()} />
      <FilterCate />

      {/* main content */}
      <div className="max-[600px]:mx-6 mx-24 my-8">
        <div className="grid max-[600px]:grid-cols-2 grid-cols-5 gap-2">
          {product.map((item, index) => (
            <Link
              href={`/product/${item.slug}`}
              className="p-2 rounded-xl drop-shadow bg-white group hover:border hover:border-[#f7941e] transition delay-150 duration-300 ease-in-out"
              key={index}>
              <Image
                src={item.offer.length ? item.configImage : item.image[0]}
                alt={item.name}
                width={160}
                height={160}
                className="mx-auto my-5 group-hover:scale-[1.1] transition delay-150 duration-300 ease-in-out"
              />
              <p className="text-ellipsis overflow-hidden text-xs text-black group-hover:text-sub_primary_color font-semibold px-2 text-center transition delay-150 duration-300 ease-in-out">
                {item.name}
              </p>
              <div className="flex justify-around items-center py-1">
                <p className="text-sm font-bold text-[#fd475a]">
                  {item.price[0] == "L" ? item.price : item.price + " ₫"}
                </p>
                <p className="text-xs text-primary_color line-through">
                  {item.price[0] == "L"
                    ? ""
                    : (
                        (parseInt(item.price.replace(/,/g, ""), 10) * 3) /
                        2
                      ).toString() + " ₫"}
                </p>
              </div>
              {item.offer.length ? (
                <>
                  <p className="text-xs text-primary_color truncate mt-1 px-1">
                    {item.offer[item.offer.length - 1]}
                  </p>
                  <p className="text-xs font-semibold text-[#f7941e] mb-1 px-1">{`VÀ ${
                    item.offer.length - 1
                  } KM KHÁC`}</p>
                </>
              ) : null}
            </Link>
          ))}
        </div>
      </div>

      <Benefit />

      <Footer />
    </>
  );
}
