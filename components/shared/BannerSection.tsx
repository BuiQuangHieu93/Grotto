import Image from "next/legacy/image";
import { Button } from "../ui/button";
import Link from "next/link";

const banners = [
  {
    src: "/image/L01-banner-01.webp",
    subheading: "NESSENTIAL STYLES",
    mainHeading: "Discover & Find Your new product",
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
    subheading: "NEW! SUPPER SUMMER",
    mainHeading: "Stylish Furniture in Unique Style",
    link: "/collections/1",
  },
];

const BannerSection = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-between bg-[#e9e8e4] w-full p-4">
      {banners.map((banner, index) => (
        <div key={index} className="relative">
          <Image
            src={banner.src}
            height={585}
            width={476}
            alt={`banner-${index + 1}`}
          />
          <div
            className={`absolute ${
              index === 1 ? "bottom-0 right-0 mb-8" : "inset-0 mt-8"
            } flex items-center flex-col ml-16 mr-16`}
          >
            <div className="text-white text-base font-semibold text-center">
              {banner.subheading}
            </div>
            <div className="text-white text-3xl font-semibold text-center mt-2">
              {banner.mainHeading}
            </div>
            <Link href={banner.link}>
              <Button className="text-gray-600 font-medium bg-gray-100 hover:bg-[#a6946b] mt-6">
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
