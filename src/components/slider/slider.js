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
    id: "1",
    name: "Máy lọc nước RO",
    description: "Tuyệt tác từ nguồn sống",
    img: slider1,
  },
  {
    id: "2",
    name: "Máy lọc nước Hòa Phát",
    description: "Bền bỉ và nước sạch",
    img: slider2,
  },
  {
    id: "3",
    name: "Máy lọc nước Karon",
    description: "Chuẩn nước uống tinh khiết",
    img: slider3,
  },
  {
    id: "4",
    name: "Máy học nước KAROFI",
    description: "An tâm toàn diện",
    img: slider4,
  },
  {
    id: "5",
    name: "Máy lọc nước Smart",
    description: "Sản phẩm chất lượng hàng đầu Việt Nam",
    img: slider5,
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
          }, 5000);
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
          <Image
            key={item.id}
            className="keen-slider__slide rounded-lg cursor-pointer"
            src={item.img}
            alt={item.name}
          />
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
