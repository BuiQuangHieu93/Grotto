import Image from "next/image";
import { Button } from "../ui/button";

const BannerSection = () => {
  return (
    <div className="flex flex-row flex-nowrap justify-between bg-[#e9e8e4] w-full p-4">
      <div className="relative">
        <Image
          src="/image/L01-banner-01.webp"
          height={585}
          width={476}
          alt="banner-01"
        />
        <div className="absolute inset-0 flex items-center flex-col ml-16 mr-16 mt-8">
          <div className="text-white text-base font-semibold text-center">
            NESSENTIAL STYLES
          </div>
          <div className="text-white text-3xl font-semibold text-center mt-2">
            Discover & Find Your new product
          </div>
          <Button className="text-gray-600 font-medium bg-gray-100 hover:bg-[#a6946b] mt-6">
            Shop Now
          </Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/image/L01-banner-02.webp"
          height={585}
          width={476}
          alt="banner-02"
        />
        <div className="absolute bottom-0 right-0 flex items-center flex-col ml-16 mr-16 mb-8">
          <div className="text-white text-base font-semibold text-center">
            SUMMER SEASON SALE
          </div>
          <div className="text-white text-3xl font-semibold text-center mt-2">
            Save 70% Off Our Favorite Home Decor
          </div>
          <Button className="text-gray-600 font-medium bg-gray-100 hover:bg-[#a6946b] mt-6">
            Shop Now
          </Button>
        </div>
      </div>
      <div className="relative">
        <Image
          src="/image/L01-banner-03.webp"
          height={585}
          width={476}
          alt="banner-03"
        />
        <div className="absolute inset-0 flex items-center flex-col ml-16 mr-16 mt-8">
          <div className="text-white text-base font-semibold text-center">
            NEW! SUPPER SUMMER
          </div>
          <div className="text-white text-3xl font-semibold text-center mt-2">
            Stylish Furniture in Unique Style
          </div>
          <Button className="text-gray-600 font-medium bg-gray-100 hover:bg-[#a6946b] mt-6">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
