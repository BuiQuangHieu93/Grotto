"use client";
import { BlogData } from "@/constants";
import { BlogDataProps } from "@/types";
import Image from "next/legacy/image";
import React from "react";

const Page = () => {
  return (
    <div className="bg-[#e9e8e4] w-full p-20">
      <div className="pb-12">
        <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center ">
          News
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12">
        {BlogData.map((data: BlogDataProps) => (
          <div key={data.id} className="group">
            <div className="relative w-[650px] h-[433px] overflow-hidden">
              <Image
                src={data.image}
                layout="fill"
                style={{ objectFit: "cover" }}
                alt={`image-${data.id}`}
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
                <div className="pl-4">{data.day}</div>
                <span className="px-2">&bull;</span>
                <div>{data.location}</div>
              </div>
              <div className="text-2xl font-semibold pb-4 group-hover:text-[#a6946b] h-20">
                {data.title}
              </div>
              <div
                className="text-[#666666] font-normal text-sm "
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {data.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
