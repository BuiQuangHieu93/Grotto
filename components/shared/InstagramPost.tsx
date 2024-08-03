"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/legacy/image";
import { InstagramPostData } from "@/constants";

const InstagramPost = () => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center bg-[#13392c] pb-20 pt-12">
        <div className="relative w-[95%] overflow-hidden">
          <Swiper
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
            slidesPerView={5}
            spaceBetween={30}
            className="p-4"
          >
            {InstagramPostData.map((data, index) => (
              <SwiperSlide key={index}>
                <div className="relative group">
                  <Image
                    src={data.image}
                    width={500}
                    height={500}
                    alt={`Instagram post ${index}`}
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src="/icon/instagram.svg"
                      width={96}
                      height={96}
                      alt="Instagram icon"
                      className="object-fill"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default InstagramPost;
