import Link from "next/link";
import Image from "next/image";

const HomeGrid = ({ product }) => {
  // Kiểm tra xem product có phải là undefined hoặc object rỗng không
  const isProductEmpty =
    !product ||
    (typeof product === "object" && Object.keys(product).length === 0);

  return (
    <div className="p-2 rounded-xl drop-shadow bg-white group hover:border hover:border-[#f7941e] transition delay-150 duration-300 ease-in-out">
      {isProductEmpty ? (
        <p className="text-black">Không có sản phẩm nào để hiển thị.</p> // Thông báo nếu không có sản phẩm
      ) : (
        <Link href={`/product/${product.slug}`} className="" key={product._id}>
          <Image
            src={product.image[0]} // Sử dụng hình ảnh đầu tiên
            alt={product.name}
            width={160}
            height={160}
            className="mx-auto my-5 group-hover:scale-[1.1] transition delay-150 duration-300 ease-in-out"
          />
          <p className="text-ellipsis overflow-hidden text-xs text-black group-hover:text-sub_primary_color font-semibold px-2 text-center transition delay-150 duration-300 ease-in-out">
            {product.name}
          </p>
          <div className="flex justify-around items-center py-1">
            <p className="text-sm font-bold text-[#fd475a]">
              {product.price.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " ₫"}{" "}
              {/* Định dạng giá */}
            </p>
            {product.offer && (
              <p className="text-xs text-primary_color line-through">
                {`${(
                  (parseInt(product.price, 10) * (100 - product.offer)) /
                  100
                ).toLocaleString()} ₫`}{" "}
                {/* Giá sau khuyến mãi */}
              </p>
            )}
          </div>
        </Link>
      )}
    </div>
  );
};

export default HomeGrid;
