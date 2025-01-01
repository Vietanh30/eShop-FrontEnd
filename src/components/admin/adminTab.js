import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const TabNav = [
  {
    name: "Trang chủ",
    path: "/admin",
  },
  {
    name: "Sản phẩm",
    path: "/admin/product",
  },
  {
    name: "Đơn hàng",
    path: "/admin/order",
  },
  {
    name: "Tài khoản",
    path: "/admin/account",
  },
];

const AdminTab = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="w-[15%] border-r-2 min-h-screen bg-white drop-shadow-lg">
      <p
        onClick={() => router.push("/admin")}
        className="cursor-pointer text-primary_color font-primary font-bold text-xl py-4 text-center border-b-2"
      >
        Shop
      </p>
      <div className="flex flex-col gap-y-4 my-4">
        {TabNav.map((item) => (
          <div key={item.name} className="w-full">
            <Link
              href={item.path}
              className={`mx-2 px-8 py-1 text-sm font-medium tracking-tighter rounded-md hover:text-primary_color hover:translate-x-2 duration-300 block ${
                pathname === item.path
                  ? "text-primary_color translate-x-2"
                  : "text-sub_primary_color"
              }`}
            >
              {item.name}
            </Link>
          </div>
        ))}
        <Link
          onClick={() => localStorage.removeItem("user-token")}
          href="/"
          className="w-full cursor-pointer"
        >
          <p className="mx-2 px-8 py-1 text-sm font-medium tracking-tighter rounded-md hover:text-primary_color hover:translate-x-2 duration-300 text-sub_primary_color">
            Đăng xuất
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AdminTab;
