"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { GetBlogParams } from "@/types";
import { getAllBlog } from "@/lib/actions/blog.actions";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState<GetBlogParams[]>([]);
  useEffect(() => {
    const fetchBlog = async () => {
      const blogs = await getAllBlog();
      setBlogs(blogs);
    };
    fetchBlog();
  }, []);
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
            {blogs.map((data) => (
              <SwiperSlide key={data._id} className="relative group">
                <Link href={`blogs/news/${data._id}`}>
                  <BlogCard key={data._id} data={data} />
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
