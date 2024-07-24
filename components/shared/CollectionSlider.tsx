import { FurnitureTrending } from "@/constants";
import FurnitureCard from "./FurnitureCard";

const CollectionSlider = () => {
  return (
    <div className="flex-center flex-col bg-[#e9e8e4] w-full pl-4 pr-4 pt-20 pb-20">
      <div className="text-[#a6946b] font-semibold mb-2">TOP COLLECTIONS</div>
      <div className="text-[#383921] text-4xl font-semibold mb-9">
        Trending Products
      </div>
      <div className="grid grid-cols-4 grid-rows-2 w-full gap-5">
        {FurnitureTrending.slice(0, 8).map((data, index) => (
          <FurnitureCard key={index} data={data} type="origin" />
        ))}
      </div>
    </div>
  );
};

export default CollectionSlider;
