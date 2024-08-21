"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FurnitureCard from "./FurnitureCard";
import { IFurniture } from "@/types";
import { getAllFurniture } from "@/lib/actions/product.actions";

const ProductCollection = () => {
  const [active, setActive] = useState("Home");
  const [product, setProduct] = useState<IFurniture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const furniture = await getAllFurniture();
      const specialProducts = furniture.filter(
        (product: IFurniture) => product.feature
      );

      setProduct(specialProducts);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-center flex-col bg-[#e9e8e4] w-full px-4 pt-20 pb-20">
      <div className="text-[#a6946b] font-semibold mb-2">TOP COLLECTIONS</div>
      <div className="text-[#383921] text-4xl font-semibold text-center">
        Special Product
      </div>
      <div className="flex justify-between w-full sm:w-[60%] md:w-[50%] lg:w-[45%] py-8 space-x-2 overflow-x-auto scrollbar-hide md:overflow-hidden">
        <Button
          className={`flex-1 p-3 sm:p-4 md:p-6 text-sm sm:text-base md:text-lg text-white hover:bg-[#a6946b] ${
            active === "Office" ? "bg-[#a6946b]" : "bg-[#333333]"
          }`}
          onClick={() => setActive("Office")}
        >
          Office Furniture
        </Button>
        <Button
          className={`flex-1 p-3 sm:p-4 md:p-6 text-sm sm:text-base md:text-lg text-white hover:bg-[#a6946b] ${
            active === "Home" ? "bg-[#a6946b]" : "bg-[#333333]"
          }`}
          onClick={() => setActive("Home")}
        >
          Home Furniture
        </Button>
        <Button
          className={`flex-1 p-3 sm:p-4 md:p-6 text-sm sm:text-base md:text-lg text-white hover:bg-[#a6946b] ${
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
            spaceBetween={20}
            breakpoints={{
              320: {
                slidesPerView: 2, // Mobile devices
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2, // Small tablets
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 2, // Medium tablets
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3, // Large tablets and small desktops
                spaceBetween: 25,
              },
              1280: {
                slidesPerView: 4, // Desktops
                spaceBetween: 30,
              },
            }}
            className="p-4"
          >
            {product
              .filter((product) => product.type === active)
              .map((product, index) => (
                <SwiperSlide key={index} className="relative group">
                  <div>
                    <FurnitureCard data={product} type="origin" />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ProductCollection;
