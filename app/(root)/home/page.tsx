import Carousel from "@/components/shared/Carousel";
import { dataSlides, dataCategories } from "../../../constants/index";
import ShippingWrapper from "@/components/shared/ShippingWrapper";
import CategoryCollection from "@/components/shared/CategoryCollection";
import Marquee from "@/components/shared/Marquee";
import CollectionSlider from "@/components/shared/CollectionSlider";
import BannerSection from "@/components/shared/BannerSection";
import AboutusSection from "@/components/shared/AboutusSection";
import VideoSection from "@/components/shared/VideoSection";
import ProductCollection from "@/components/shared/ProductCollection";
import Blog from "@/components/shared/Blog";
import BrandLogoCollection from "@/components/shared/BrandLogoCollection";
import InstagramPost from "@/components/shared/InstagramPost";

const page = () => {
  return (
    <div className="w-full flex-center flex-wrap">
      <Carousel data={dataSlides} />
      <ShippingWrapper />
      <CategoryCollection data={dataCategories} />
      <Marquee />
      <CollectionSlider />
      <BannerSection />
      <AboutusSection />
      <Marquee />
      <VideoSection />
      <ProductCollection />
      <Blog />
      <BrandLogoCollection />
      <InstagramPost />
    </div>
  );
};

export default page;
