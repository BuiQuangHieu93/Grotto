"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../ui/button";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  //   buttons: ButtonProps[];
}

// interface ButtonProps {
//   id: number;
//   text: string;
//   link: string;
//   type: string;
// }

interface DemoSliderProps {
  data: Slide[];
}

const DemoSlider = ({ data }: DemoSliderProps) => {
  return (
    <section className="w-full">
      <div className=" h-screen">
        <ul className="h-full w-full">
          <Swiper
            navigation
            pagination={{ type: "bullets", clickable: true }}
            autoplay={true}
            loop={true}
            modules={[Autoplay, Navigation, Pagination]}
          >
            {data.map(({ id, image, tagline, title }) => (
              <SwiperSlide key={id}>
                <div
                  className="h-full w-full absolute left-0 top-0"
                  style={{
                    background: `url(${image}) center center / cover scroll no-repeat`,
                  }}
                ></div>
                <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
                <div className="relative z-10 h-full flex items-center justify-center">
                  <div className="text-center">
                    {tagline && (
                      <p className="text-md sm:text-xl lg:text-3xl font-semibold text-white">
                        {tagline}
                      </p>
                    )}
                    <p className="text-3xl sm:text-6xl lg:text-8xl font-bold text-white">
                      {title}
                    </p>
                    <div className="mt-8">
                      <Button className="bg-white text-black font-thin rounded-sm cursor-pointer hover:bg-[#a6946b] hover:font-white delay-200 mr-2">
                        <div className="p-4"> Shop now</div>
                      </Button>
                      <Button className="bg-white text-black font-thin rounded-sm cursor-pointer hover:bg-[#a6946b] hover:font-white delay-200 ml-2">
                        <div className="p-4"> Collection</div>
                      </Button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </section>
  );
};

export default DemoSlider;
