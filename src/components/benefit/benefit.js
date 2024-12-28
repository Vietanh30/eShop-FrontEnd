import Image from "next/image";

import image1 from "../../../src/image/benefit/image1.jpg";
import image2 from "../../../src/image/benefit/image2.jpg";
import image3 from "../../../src/image/benefit/image3.jpg";
import image4 from "../../../src/image/benefit/image4.jpg";

const benefitItem = [
  { name: "Sản phẩm", description: "CHÍNH HÃNG", img: image1 },
  { name: "Miễn phí vận chuyển", description: "TOÀN QUỐC", img: image2 },
  { name: "Hotline hỗ trợ", description: "1900.1000", img: image3 },
  { name: "Thủ tục đổi trả", description: "DỄ DÀNG", img: image4 },
];

const Benefit = () => {
  return (
    <div className="max-[600px]:hidden flex justify-around items-center py-4 mx-24">
      {benefitItem.map((item, index) => (
        <div className="flex justify-around items-center space-x-2" key={index}>
          <Image src={item.img} alt={item.name} />
          <div>
            <p className="text-xs text-primary_color font-light">{item.name}</p>
            <p className="text-sm text-primary_color font-bold">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefit;
