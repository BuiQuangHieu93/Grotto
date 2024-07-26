"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FurnitureCard from "./FurnitureCard";
import { FurnitureTrending } from "@/constants";
import Link from "next/link";

const ProductCollection = () => {
  const [active, setActive] = useState("Office");

  return (
    <div className="flex-center flex-col bg-[#e9e8e4] w-full pl-4 pr-4 pt-20 pb-20">
      <div className="text-[#a6946b] font-semibold mb-2">TOP COLLECTIONS</div>
      <div className="text-[#383921] text-4xl font-semibold">
        Special Product
      </div>
      <div className="flex justify-between w-[35%] py-8">
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active === "Office" ? "bg-[#a6946b]" : "bg-[#333333]"
          }`}
          onClick={() => setActive("Office")}
        >
          Office Furniture
        </Button>
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active === "Home" ? "bg-[#a6946b]" : "bg-[#333333]"
          }`}
          onClick={() => setActive("Home")}
        >
          Home Furniture
        </Button>
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active === "Kitchen" ? "bg-[#a6946b]" : "bg-[#333333]"
          }`}
          onClick={() => setActive("Kitchen")}
        >
          Kitchen Furniture
        </Button>
      </div>
      <div className="w-full bg-[#e9e8e4] flex-center">
        <div className="relative w-[95%] overflow-hidden">
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={4}
            spaceBetween={30}
            className="p-4"
          >
            {FurnitureTrending.filter((product) => product.type === active).map(
              (product, index) => (
                <SwiperSlide key={index} className="relative group">
                  <Link href={`/products/${product.id}`}>
                    <FurnitureCard data={product} type="origin" />
                  </Link>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
