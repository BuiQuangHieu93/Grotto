"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BlogData } from "@/constants";
import BlogCard from "./BlogCard";
import Link from "next/link";

const Blog = () => {
  return (
    <>
      <div className="flex-center flex-col bg-[#e9e8e4] w-full pb-9">
        <div className="text-[#a6946b] uppercase text-base font-semibold mb-1">
          Latest News
        </div>
        <div className="text-[#333333] text-4xl font-semibold">
          Recently Form The Blog
        </div>
      </div>
      <div className="w-full #e9e8e4 flex-center bg-[#e9e8e4] pb-20">
        <div className="relative w-[95%] overflow-hidden">
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={3}
            spaceBetween={30}
            className="p-4"
          >
            {BlogData.map((data) => (
              <SwiperSlide key={data.id} className="relative group">
                <Link href={`blogs/news/${data.id}`}>
                  <BlogCard key={data.id} data={data} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Blog;
