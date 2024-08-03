"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { FurnitureData } from "@/types";

const FurnitureCard = ({ data, type }: FurnitureData) => {
  const [hover, setHover] = useState(false);

  const generateNumber = (number?: number) => {
    if (number === undefined) {
      return "0.00"; // or handle it as per your requirement
    }
    return number.toFixed(2);
  };

  const calculateSale = (originalPrice: number, salePrice: number) => {
    return ((1 - salePrice / originalPrice) * 100).toFixed(0);
  };

  return (
    <div className={`flex ${type === "horizon" ? "flex-row" : "flex-col"}`}>
      <div
        className={`relative group overflow-hidden ${
          type === "horizon" ? "pr-4" : ""
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={`relative overflow-hidden`}>
          <div>
            <Image
              src={hover ? data?.imageHover : data?.images?.[0]}
              height={600}
              width={600}
              alt="furniture"
              className={`transition-transform duration-500 ease-in-out relative ${
                hover ? "scale-110 opacity-90" : "scale-100 opacity-100"
              }`}
            />
          </div>
          {hover && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <Button className="bg-[#a6946b] p-2 rounded-md">
                <Image
                  src="/icon/eye-on.svg"
                  height={24}
                  width={24}
                  alt="View"
                  className="fill-white"
                />
              </Button>
              <Button className="bg-[#a6946b] p-2 rounded-md">
                <Image
                  src="/icon/briefcase.svg"
                  height={24}
                  width={24}
                  alt="Add to Cart"
                  className="fill-white"
                />
              </Button>
              <Button className="bg-[#a6946b] p-2 rounded-md">
                <Image
                  src="/icon/star-outline.svg"
                  height={24}
                  width={24}
                  alt="Favorite"
                />
              </Button>
              <Button className="bg-[#a6946b] p-2 rounded-md">
                <Image
                  src="/icon/customer-information-list.svg"
                  height={24}
                  width={24}
                  alt="Info"
                />
              </Button>
            </div>
          )}
        </div>
        {data?.salePrice && (
          <div className="absolute top-4 left-4 h-6 w-14 rounded-lg bg-[#a6946b] flex items-center justify-center transition-all duration-500 ease-in-out text-xs text-white">
            - {calculateSale(data.originalPrice, data.salePrice)}%
          </div>
        )}
      </div>
      <div>
        <div
          className={`font-semibold transition-colors duration-500 ease-in-out pt-4 ${
            hover ? "text-[#a6946b]" : "text-[#333333]"
          }`}
        >
          {data?.title}
        </div>
        <div className="flex pt-2">
          <div className="text-[#666666] line-through mr-4">
            ${generateNumber(data?.originalPrice)} USD
          </div>
          {data.salePrice && (
            <div className="font-semibold">
              ${generateNumber(data?.salePrice)} USD
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FurnitureCard;
