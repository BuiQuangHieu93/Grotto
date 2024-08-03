"use client";
import { CardProps } from "@/types";
import Image from "next/legacy/image";
import React, { useState } from "react";

const CollectionCard = (data: CardProps) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="flex-center w-full flex-col group"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="overflow-hidden w-[476px] h-[595px] relative aspect-w-3 aspect-h-4">
        <Image
          src={data.image}
          layout="fill"
          alt="furniture"
          className="group-hover:scale-105 transition-transform duration-500 object-cover"
        />
      </div>
      <div className="py-4 flex-center flex-col">
        <div className="text-xl font-semibold">{data.title}</div>
        <div
          className={`h-12 w-12 rounded-full border-2  ${
            hover ? "bg-[#a6946b] border-[#a6946b]" : "border-slate-950"
          } flex-center mt-5`}
        >
          <Image
            src={`${
              hover
                ? "/icon/angle-right-white.svg"
                : "/icon/angle-right-black.svg"
            }`}
            width={24}
            height={24}
            alt="angleRight"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
