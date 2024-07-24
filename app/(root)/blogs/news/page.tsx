"use client";
import { BlogData } from "@/constants";
import Image from "next/image";
import React from "react";

interface BlogDataProps {
  id: number;
  image: string;
  day: string;
  location: string;
  title: string;
  detail: string;
}

const Page = () => {
  return (
    <div className="bg-[#e9e8e4] w-full p-20">
      <div className="pb-12">
        <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center ">
          News
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12">
        {BlogData.map((item: BlogDataProps) => (
          <div key={item.id} className="group">
            <div className="w-[650px] h-[433px] overflow-hidden">
              <Image
                src={item.image}
                width={700}
                height={650}
                alt={`image-${item.id}`}
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
                <div className="pl-4">{item.day}</div>
                <span className="px-2">&bull;</span>
                <div>{item.location}</div>
              </div>
              <div className="text-2xl font-semibold pb-4 group-hover:text-[#a6946b] h-20">
                {item.title}
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
                {item.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
