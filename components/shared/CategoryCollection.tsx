"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/legacy/image";
import Link from "next/link";
import { DemoSliderProps } from "@/types";

const CategoryCollection = ({ data }: DemoSliderProps) => {
  return (
    <div className="w-full bg-[#13392c] flex-center pb-20">
      <div className="relative w-[95%] overflow-hidden">
        <Swiper
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay, Navigation, Pagination]}
          slidesPerView={4}
          spaceBetween={30}
          className="p-4"
        >
          {data.map(({ id, image, title, count }) => (
            <SwiperSlide key={id} className="relative group">
              <Link href="/collections/1">
                <div className="overflow-hidden">
                  <Image
                    src={image}
                    height={550}
                    width={442}
                    alt={`category-${id}`}
                    className="group-hover:scale-125 duration-500 transition-transform"
                  />
                </div>
                <div className="text-3xl font-semibold text-white pt-4 group-hover:text-[#a6946b] pb-4">
                  {title}
                </div>
                <div className="text-white border-2 border-white rounded-full w-14 h-14 flex items-center justify-center group-hover:bg-[#a6946b]">
                  {count}
                </div>
                <div className="w-full h-[1px] bg-white mt-8 opacity-90"></div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CategoryCollection;
