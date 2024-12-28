import Link from "next/link";

const HomeTitle = ({ title, href }) => {
  return (
    <div className="flex">
      <div className="bg-sub_primary_color w-12 border-b-[14px] border-b-sub_primary_color border-t-[14px] border-t-primary_color border-r-[14px] border-r-primary_color"></div>
      <div className="bg-primary_color px-16 py-1 inline-block">
        <Link href={href ? href : "/"}>
          <p className="font-bold text-sm hover:text-sub_primary_color">
            {title?.toUpperCase()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default HomeTitle;
