"use client";

import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import "./slider.css";

import slider1 from "../../../src/image/slider/slider1.jpg";
import slider2 from "../../../src/image/slider/slider2.jpg";
import slider3 from "../../../src/image/slider/slider3.jpg";
import slider4 from "../../../src/image/slider/slider4.jpg";
import slider5 from "../../../src/image/slider/slider5.jpg";

const sliderItem = [
  {
    name: "Sony WF-1000XM5",
    description: "Ưu đãi tháng 11",
    img: slider1,
    link: "/product/tai-nghe-khong-day-sony-wf-1000xm5-chinh-hang",
  },
  {
    name: "Marshall Motif II ANC",
    description: "Tái hiện âm thanh sân khấu",
    img: slider2,
    link: "/product/tai-nghe-khong-day-marshall-motif-ii-anc-chinh-hang",
  },
  {
    name: "Tăng cường hiệu suất với 9Fit",
    description: "Sản phẩm phụ kiện mới",
    img: slider3,
    link: "/cate/accessory",
  },
  {
    name: "Đồng hồ KIESLECT - Chính hãng",
    description: "Đa tính năng - Đa tiện ích",
    img: slider4,
    link: "/cate/kieslect",
  },
  {
    name: "Redmi Note 12",
    description: "Giá siêu ưu đãi, chỉ từ 3.890.000đ",
    img: slider5,
    link: "/product/redmi-note-12-4gb-128gb-chinh-hang",
  },
];

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const Slider = () => {
  const [sliderRef, instanceRef] = useKeenSlider(
    {
      initial: 0,
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 3000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
      loop: true,
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <div className="max-[600px]:hidden mx-24 my-6">
      <div ref={sliderRef} className="keen-slider">
        {sliderItem.map((item, index) => (
          <Link href={item.link} key={index}>
            <Image
              className="keen-slider__slide rounded-lg cursor-pointer"
              src={item.img}
              alt={item.name}
            />
          </Link>
        ))}
      </div>

      <div
        ref={thumbnailRef}
        className="keen-slider thumbnail cursor-pointer mt-2"
      >
        {sliderItem.map((item, index) => (
          <div
            className="keen-slider__slide flex flex-col items-center py-3 rounded-lg bg-white drop-shadow-lg"
            key={index}
          >
            <p className="text-sm text-center text-sub_primary_color font-semibold keen-slider__name">
              {item.name}
            </p>
            <p className="text-xs text-sub_primary_color font-light keen-slider__description">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
