import { LogoBrands } from "@/constants";
import Image from "next/legacy/image";
import React from "react";
import Marquee from "react-fast-marquee";

const BrandLogoCollection = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#e9e8e4] text-white text-sm w-full pb-20">
      <Marquee speed={70}>
        {LogoBrands.map((logo, index) => (
          <div key={index} className="mx-20">
            <Image src={logo.image} width={96} height={96} alt="logo" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default BrandLogoCollection;
