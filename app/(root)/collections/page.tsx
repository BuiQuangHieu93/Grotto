import CollectionCard from "@/components/shared/CollectionCard";
import { CardData } from "@/constants";

const page = () => {
  return (
    <div className="flex-center w-full bg-[#e9e8e4] flex-col">
      <div className="text-4xl font-semibold my-12">Collections</div>
      <div className="grid grid-cols-3 gap-8 px-5 py-8">
        {CardData.map((data, index) => (
          <div className="flex-center w-full" key={index}>
            <CollectionCard data={data} key={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
