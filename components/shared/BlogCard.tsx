import { BlogDataProps } from "@/types";
import Image from "next/legacy/image";

const BlogCard = ({ data }: { data: BlogDataProps }) => {
  return (
    <div className="">
      <Image src={data?.image} width={476} height={287} alt={`${data?.id}`} />
      <div className="flex flex-row text-center text-sm text-[#a6946b] uppercase">
        <span>
          <Image
            src="/icon/calendar.svg"
            width={24}
            height={24}
            alt="calendar"
          />
        </span>
        <span className="pl-2">{data?.day}</span>
        <span className="px-2">&bull;</span>
        <span> {data?.location}</span>
      </div>
      <div className="text-lg font-semibold">{data?.title}</div>
    </div>
  );
};

export default BlogCard;
