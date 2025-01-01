import { getAllCates } from "@/app/api/cateApi";
import Link from "next/link";
import { useEffect, useState } from "react";

const NavCate = ({ listCate }) => {
  const [cate, setCate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getAllCates();
        // Filter the categories based on the slug
        console.log(res);
        const filteredCate = res.find((category) => category.slug === listCate);
        setCate(filteredCate);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [listCate]);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

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
        <Link href="/" className="font-bold text-black text-sm">
          Trang chủ
        </Link>
      </Link>
      {cate && (
        <Link
          href={`/cate/${cate.slug}`}
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
          <p className="text-sub_primary_color font-bold text-sm">
            {cate.name}
          </p>
        </Link>
      )}
    </div>
  );
};

export default NavCate;
