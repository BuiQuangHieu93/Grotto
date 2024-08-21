import Image from "next/legacy/image";
import { Button } from "../ui/button";
import Link from "next/link";

const banners = [
  {
    src: "/image/L01-banner-01.webp",
    subheading: "ESSENTIAL STYLES",
    mainHeading: "Discover & Find Your New Product",
    link: "/collections/1",
  },
  {
    src: "/image/L01-banner-02.webp",
    subheading: "SUMMER SEASON SALE",
    mainHeading: "Save 70% Off Our Favorite Home Decor",
    link: "/collections/1",
  },
  {
    src: "/image/L01-banner-03.webp",
    subheading: "NEW! SUPER SUMMER",
    mainHeading: "Stylish Furniture in Unique Style",
    link: "/collections/1",
  },
];

const BannerSection = () => {
  return (
    <div className="w-full p-4 bg-[#e9e8e4] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {banners.map((banner, index) => (
        <div key={index} className="relative w-full ">
          <div className="w-full h-0 pb-[66.67%] relative">
            <Image
              src={banner.src}
              layout="fill"
              alt={`banner-${index + 1}`}
              className="object-cover"
            />
          </div>

          <div
            className={`absolute ${
              index === 1 ? "bottom-0 right-0 mb-4" : "top-0 left-0 mt-4"
            } flex flex-col items-center px-2 py-1 md:px-4 md:py-2 bg-gradient-to-t from-black via-transparent to-transparent w-full`}
          >
            <div className="text-white text-xs md:text-sm lg:text-base font-semibold text-center">
              {banner.subheading}
            </div>
            <div className="text-white text-base md:text-lg lg:text-2xl font-semibold text-center mt-2">
              {banner.mainHeading}
            </div>
            <Link href={banner.link}>
              <Button className="mt-3 md:mt-4 bg-gray-100 text-gray-600 hover:bg-[#a6946b] text-xs md:text-sm lg:text-base">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BannerSection;
