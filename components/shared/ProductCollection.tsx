"use client";

import { Button } from "../ui/button";
import { useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FurnitureCard from "./FurnitureCard";
import { ProductCollectionData } from "@/constants";

interface ProductCollection {
  id: string;
  image: string;
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  type: string;
}

interface Furniture {
  image: string;
  imageHover: string;
  title: string;
  originalPrice: number;
  salePrice: number;
}

const ProductCollection = () => {
  const [active, setActive] = useState("Office");

  return (
    <div className="flex-center flex-col bg-[#e9e8e4] w-full pl-4 pr-4 pt-20 pb-20">
      <div className="text-[#a6946b] font-semibold mb-2">TOP COLLECTIONS</div>
      <div className="text-[#383921] text-4xl font-semibold ">
        Special Product
      </div>
      <div className="flex justify-between w-[35%]">
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active == "Office" ? "bg-[#a6946b]" : "bg-[#333333]"
          } `}
          onClick={() => setActive("Office")}
        >
          Office Furniture
        </Button>
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active == "Home" ? "bg-[#a6946b]" : "bg-[#333333]"
          } `}
          onClick={() => setActive("Home")}
        >
          Home Furniture
        </Button>
        <Button
          className={`p-6 text-white hover:bg-[#a6946b] ${
            active == "Kitchen" ? "bg-[#a6946b]" : "bg-[#333333]"
          } `}
          onClick={() => setActive("Kitchen")}
        >
          Kitchen Furniture
        </Button>
      </div>
      <div className="w-full #e9e8e4 flex-center pb-20">
        <div className="relative w-[95%] overflow-hidden">
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={4}
            spaceBetween={30}
            className="p-4"
          >
            {ProductCollectionData.filter(
              (product) => product.type === "Office"
            ).map((product) => {
              const furnitureData: Furniture = {
                image: product.image,
                imageHover: product.imageHover,
                title: product.title,
                originalPrice: product.originalPrice,
                salePrice: product.salePrice,
              };
              return (
                <SwiperSlide key={product.id} className="relative group">
                  <FurnitureCard key={product.id} data={furnitureData} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;