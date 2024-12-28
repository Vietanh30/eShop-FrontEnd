import { useRouter } from "next/navigation";

const FilterCate = () => {
  const router = useRouter();

  return (
    <div className="max-[600px]:hidden flex justify-around items-center mx-24 my-2 bg-white drop-shadow-xl rounded-lg relative z-20">
      <div className="group py-4">
        <p className="px-6 text-sm text-sub_primary_color font-bold">
          Lọc danh sách:
        </p>
      </div>
      <div className="group py-4">
        <p className="px-6 text-sm text-sub_primary_color hover:text-red-500 cursor-pointer">
          Giá
        </p>

        <div className="absolute hidden group-hover:block left-0 top-12 w-full z-20">
          <div className="drop-shadow-2xl rounded py-3 px-6 my-1 bg-white">
            <p
              className="text-primary_color text-xs py-1 hover:underline cursor-pointer"
              onClick={() => router.replace("?_filter=min5")}
            >
              Dưới 5 triệu
            </p>
            <p
              className="text-primary_color text-xs py-1 hover:underline cursor-pointer"
              onClick={() => router.replace("?_filter=max5")}
            >
              Trên 5 triệu
            </p>
          </div>
        </div>
      </div>
      <div className="group py-4">
        <p className="px-6 text-sm text-sub_primary_color hover:text-red-500 cursor-pointer">
          Sắp xếp
        </p>

        <div className="absolute hidden group-hover:block left-0 top-12 w-full z-20">
          <div className="drop-shadow-2xl rounded py-3 px-6 my-1 bg-white">
            <p
              className="text-primary_color text-xs py-1 hover:underline cursor-pointer"
              onClick={() => router.replace("?_sort=asc")}
            >
              Giá thấp đến cao
            </p>
            <p
              className="text-primary_color text-xs py-1 hover:underline cursor-pointer"
              onClick={() => router.replace("?_sort=des")}
            >
              Giá cao đến thấp
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCate;
