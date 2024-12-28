import Image from "next/image";

import img1 from "../../../src/image/footer/img1.jpg";
import img2 from "../../../src/image/footer/img2.jpg";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("user-token"));
  }, [])
  
  return (
    <>
      <div className="min-[600px]:hidden flex flex-row justify-around w-screen fixed bottom-0 left-0 z-40 text-primary_color bg-white">
        <div className="py-4"><Link href="/" className="hover:bg-gray-50">Trang chủ</Link></div>
        <div className="py-4"><Link href={token ? "/profile" : "/login"} className="hover:bg-gray-50">Trang cá nhân</Link></div>
        <div className="py-4"><Link href={token ? "/cart" : "/login"} className="hover:bg-gray-50">Giỏ hàng</Link></div>
      </div>

      <div className="max-[600px]:hidden mx-24 p-4 bg-primary_color rounded-lg">
        <div className="flex justify-between">
          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Hỗ Trợ - Dịch Vụ
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Chính sách và hướng dẫn mua hàng trả góp
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Hướng dẫn mua hàng và chính sách vận chuyển
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Tra cứu đơn hàng
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Chính sách đổi mới và bảo hành
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Dịch vụ bảo hành mở rộng
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Chính sách bảo mật
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Chính sách giải quyết khiếu nại
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Quy chế hoạt động
            </p>
          </div>

          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Thông Tin Liên Hệ
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Thông tin các trang TMĐT
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Dịch vụ sửa chữa
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Khách hàng doanh nghiệp (B2B)
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Tra cứu bảo hành
            </p>
          </div>

          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Hệ thống siêu thị
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              Danh sách 63 siêu thị trên toàn quốc
            </p>
          </div>

          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Tổng đài
            </p>
            <p className="font-bold text-primary_color cursor-pointer px-2 py-1 bg-[#ddd] hover:bg-white rounded-lg inline-block">
              1900.1000
            </p>
          </div>

          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Thanh toán miễn phí
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              VISA
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              ATM
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              VNPAY
            </p>
            <p className="text-xs font-light text-[#ddd] cursor-pointer hover:text-white">
              MOMO
            </p>
          </div>

          <div className="w-1/6 space-y-1">
            <p className="font-bold text-[#ddd] cursor-pointer hover:text-white">
              Hình thức vận chuyển
            </p>
            <div className="flex space-x-2">
              <Image src={img1} alt="NHAT TIN" />
              <Image src={img2} alt="VIETNAM POST" />
            </div>
          </div>
        </div>
        <div className="text-center space-y-2 mt-8">
          <p className="text-xs font- text-[#ddd]">
            Địa chỉ: Hà Nội, Việt Nam. Điện
            thoại: 1900.1000. Chịu trách nhiệm nội dung:{" "}
            <span className="text-white">Nguyễn Bòng Quyết</span>.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
