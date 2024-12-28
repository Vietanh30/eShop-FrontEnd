import Link from "next/link";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import { useEffect } from "react";
import "keen-slider/keen-slider.min.css";

const HomeSlider = ({ product, perView }) => {
  const sliderOptions = {
    slides: { perView: perView },
    loop: true,
  };

  const [sliderRef, internalSlider] = useKeenSlider(sliderOptions, [
    (slider) => {
      let timeout;
      let mouseOver = false;
      function clearNextTimeout() {
        clearTimeout(timeout);
      }
      function nextTimeout() {
        // try {
        //   console.log("Current slider:", slider);
        //   clearTimeout(timeout);
        //   if (mouseOver) return;
        //   timeout = setTimeout(() => {
        //     if (slider) {
        //       console.log("Calling slider.next()");
        //       slider.next();
        //     } else {
        //       console.warn("Slider is null or undefined");
        //     }
        //   }, 3000);
        // } catch (error) {
        //   console.error("Error in nextTimeout:", error);
        // }
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
  ]);

  useEffect(() => {
    internalSlider.current?.update({
      ...sliderOptions,
    });
  }, [internalSlider, sliderOptions]);

  return (
    <div
      ref={sliderRef}
      className={`keen-slider p-2 bg-white rounded-lg drop-shadow`}>
      {product?.map((item, index) => (
        <Link
          className="keen-slider__slide flex flex-col justify-between group"
          key={index}
          href={`/product/${item.slug}`}>
          <div>
            <Image
              src={item.offer.length ? item.configImage : item.image[0]}
              alt={item.name}
              width={200}
              height={200}
              className="mx-auto my-2 group-hover:scale-[1.1] transition delay-150 duration-300 ease-in-out"
            />
            <p className="text-xs text-black font-semibold px-2 text-center group-hover:text-sub_primary_color transition delay-150 duration-300 ease-in-out">
              {item.name}
            </p>
          </div>
          <div>
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
                <p className="text-center text-xs text-primary_color truncate mt-1 px-1">
                  {item.offer[item.offer.length - 1]}
                </p>
                <p className="text-center text-xs font-semibold text-[#f7941e] mb-1 px-1">{`VÀ ${
                  item.offer.length - 1
                } KM KHÁC`}</p>
              </>
            ) : null}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomeSlider;
