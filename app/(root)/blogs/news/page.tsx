"use client";

import { getAllBlog } from "@/lib/actions/blog.actions";
import { GetBlogParams } from "@/types";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [blogs, setBlogs] = useState<GetBlogParams[]>([]);
  const formattedDate = (day: Date) => {
    return new Date(day).toLocaleDateString();
  };
  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await getAllBlog();
      setBlogs(blogs);
    };
    fetchBlog();
  }, []);
  return (
    <div className="bg-[#e9e8e4] w-full md:p-20 p-5">
      <div className="pb-12">
        <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center ">
          News
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
        {blogs.map((data: GetBlogParams) => (
          <Link
            key={data._id}
            className="group"
            href={`/blogs/news/${data._id}`}
          >
            <div className="relative w-full h-0 pb-[100%] md:h-[433px] lg:w-[650px] lg:h-[433px] sm:pb-0 overflow-hidden">
              <Image
                src={data.image}
                layout="fill"
                style={{ objectFit: "cover" }}
                alt={`image-${data._id}`}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            <div>
              <div className="flex flex-row text-center text-sm text-[#a6946b] uppercase py-4">
                <span>
                  <Image
                    src="/icon/calendar.svg"
                    width={24}
                    height={24}
                    alt="calendar"
                  />
                </span>
                <div className="pl-4">{formattedDate(data.day)}</div>
                <span className="px-2">&bull;</span>
                <div>{data.location}</div>
              </div>
              <div className="pb-4 sm:h-20">
                <div className="text-2xl font-semibold group-hover:text-[#a6946b] line-clamp-2 overflow-hidden ">
                  {data.title}
                </div>
              </div>

              <div className="text-[#666666] font-normal text-sm sm:line-clamp-2 line-clamp-4">
                {data.detail}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
