"use client";

import Image from "next/image";
import { useState } from "react";

// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// // import "./slider.css";

// function ThumbnailPlugin(mainRef) {
//   return (slider) => {
//     function removeActive() {
//       slider.slides.forEach((slide) => {
//         slide.classList.remove("active");
//       });
//     }
//     function addActive(idx) {
//       slider.slides[idx].classList.add("active");
//     }

//     function addClickEvents() {
//       slider.slides.forEach((slide, idx) => {
//         slide.addEventListener("click", () => {
//           if (mainRef.current) mainRef.current.moveToIdx(idx);
//         });
//       });
//     }

//     slider.on("created", () => {
//       if (!mainRef.current) return;
//       addActive(slider.track.details.rel);
//       addClickEvents();
//       mainRef.current.on("animationStarted", (main) => {
//         removeActive();
//         const next = main.animator.targetIdx || 0;
//         addActive(main.track.absToRel(next));
//         slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
//       });
//     });
//   };
// }

const ProductSlider = ({ product }) => {
  // console.log(product);
  // const [sliderRef, instanceRef] = useKeenSlider({
  //   initial: 0,
  //   loop: true,
  // });
  // const [thumbnailRef] = useKeenSlider(
  //   {
  //     initial: 0,
  //     slides: {
  //       perView: 5,
  //       spacing: 0,
  //     },
  //     loop: true,
  //   },
  //   [ThumbnailPlugin(instanceRef)]
  // );

  const [item, setItem] = useState(null);

  return (
    <div className="max-[600px]:w-full w-[28%]">
      <Image
        className="max-[600px]:mx-auto rounded-lg h-[320px] object-cover"
        src={item ?? product?.image?.[0]}
        alt={product?.image?.[0]}
        width={200}
        height={200}
      />
      <div className="flex gap-x-2 overflow-x-auto w-full">
      {
        product?.image?.slice(0,4)?.map((item) => (
          <div className="border border-green-200 rounded-xl w-1/4 cursor-pointer" onClick={() => setItem(item)}>
            <Image
              className="object-cover"
              src={item}
              alt={item}
              width={200}
              height={200}
            />
          </div>
        ))
      }
      </div>
      {/* <div ref={sliderRef} className="keen-slider">
        {product &&
          product.image.map(function (item, index) {
            let cpyImage = item.replace("productlist/dst", "preview");
            return (
              <div key={index}>
                <Image
                  className="keen-slider__slide rounded-lg h-[320px] object-contain"
                  src={cpyImage}
                  alt={cpyImage}
                  width={200}
                  height={200}
                />
              </div>
            );
          })}
      </div> */}

      {/* <div
        ref={thumbnailRef}
        className="keen-slider thumbnail cursor-pointer mt-2"
      >
        {product &&
          product.image.map((item, index) => (
            <div
              className="keen-slider__slide rounded-lg bg-white drop-shadow-lg border border-primary_color"
              key={index}
            >
              <Image
                className="keen-slider__slide cursor-pointer object-contain z-50"
                src={item}
                alt={item}
                width={50}
                height={50}
              />
            </div>
          ))}
      </div> */}
    </div>
  );
};

export default ProductSlider;
