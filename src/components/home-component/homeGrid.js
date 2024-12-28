import Link from "next/link";
import Image from "next/image";

const HomeGrid = ({ product }) => {
  return (
    <div className="grid max-[600px]:grid-cols-2 grid-cols-5 gap-2">
      {product?.map((item, index) => (
        <Link
          href={`/product/${item.slug}`}
          className="p-2 rounded-xl drop-shadow bg-white group hover:border hover:border-[#f7941e] transition delay-150 duration-300 ease-in-out"
          key={index}
        >
          <Image
            src={
              item.offer
                ? item.offer.length
                  ? item.configImage
                  : item.image[0]
                : item.img
            }
            alt={item.name}
            width={160}
            height={160}
            className="mx-auto my-5 group-hover:scale-[1.1] transition delay-150 duration-300 ease-in-out"
          />
          <p className="text-ellipsis overflow-hidden text-xs text-black group-hover:text-sub_primary_color font-semibold px-2 text-center transition delay-150 duration-300 ease-in-out">
            {item.name}
          </p>
          {item.price && (
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
          )}
          {item.offer && item.offer.length ? (
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
  );
};

export default HomeGrid;
