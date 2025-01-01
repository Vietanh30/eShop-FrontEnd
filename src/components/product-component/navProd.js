import Link from "next/link";
const NavProd = ({ product }) => {
  return (
    <div className="max-[600px]:mx-6 flex items-center mx-24 my-6 space-x-2">
      <Link href="/" className="flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
        <p className="font-bold text-black text-sm line-clamp-1">Trang chủ</p>
      </Link>
      {product && (
        <Link
          href={`/cate/${product.cate.slug}`}
          className="flex items-center space-x-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#009a82"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <p className="text-black font-bold text-sm line-clamp-1">
            {product?.cate.name}
          </p>
        </Link>
      )}
      <div className="flex items-center space-x-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#009a82"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
        <p className="font-bold text-sub_primary_color text-xs line-clamp-1">
          {product?.name}
        </p>
      </div>
    </div>
  );
};

export default NavProd;
