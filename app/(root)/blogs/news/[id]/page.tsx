import BlogCard from "@/components/shared/BlogCard";
import { Button } from "@/components/ui/button";
import { BlogData } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  const item = BlogData[0];
  return (
    <div className="bg-[#e9e8e4] w-full py-20 px-5">
      <div className="pb-12">
        <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center">
          Blog
        </div>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="border-[1px] border-white h-[570px] rounded-md">
          <h2 className="text-xl font-semibold bg-gray-100 p-5 rounded-t-md">
            Recent Post
          </h2>
          <div className="h-[500px] overflow-y-auto rounded-b-md">
            {BlogData.map((data) => (
              <div className="flex flex-row p-4" key={data.id}>
                <div className="pr-4">
                  <div className="relative w-20 h-20">
                    <Image
                      src={data.image}
                      alt="image"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-base text-[#666666] hover:text-black">
                    {data.title}
                  </div>
                  <div className="flex flex-row pt-2">
                    <div>
                      <Image
                        src="/icon/calendar.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />
                    </div>
                    <div className="text-[#a6946b]">{data.day}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div key={item.id} className="group">
            <div className="w-full overflow-hidden">
              <Image
                src={item.image}
                width={1000}
                height={1000}
                alt={`image-${item.id}`}
                className="transition-transform duration-300"
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
                <div className="pl-4">{item.day}</div>
                <span className="px-2">&bull;</span>
                <div>{item.location}</div>
              </div>
              <div className="text-2xl font-semibold pb-4 group-hover:text-[#a6946b]">
                {item.title}
              </div>
              <div
                className="text-[#666666] font-normal text-sm"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.detail}
              </div>
            </div>
          </div>
          <Button className="flex items-center mt-5 py-2 bg-[#333333] text-white w-[20%]">
            <Image
              src="/icon/upload-share.svg"
              width={12}
              height={12}
              alt="share"
            />
            <span className="ml-2">Share</span>
          </Button>
        </div>
      </div>
      <div className="flex-center mt-20">
        <Link className="flex flex-row" href="/blog/news">
          <Image
            src="/icon/arrow-back.svg"
            width={20}
            height={20}
            alt="arrow-back"
          />
          <span className="ml-4">Back to blog</span>
        </Link>
      </div>
    </div>
  );
};

export default Page;
