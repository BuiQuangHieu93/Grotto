"use client";
import { FurnitureTrending } from "@/constants";
import FurnitureCard from "./FurnitureCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllFurniture } from "@/lib/actions/product.actions";
import { GetFurniture } from "@/types";

const CollectionSlider = () => {
  const [product, setProduct] = useState<GetFurniture[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const furniture = await getAllFurniture();
      setProduct(furniture);
    };

    fetchData();
  }, []);

  return (
    <div className="flex-center flex-col bg-[#e9e8e4] w-full pl-4 pr-4 pt-20 pb-20">
      <div className="text-[#a6946b] font-semibold mb-2">TOP COLLECTIONS</div>
      <div className="text-[#383921] text-4xl font-semibold mb-9">
        Trending Products
      </div>
      <div className="grid grid-cols-4 grid-rows-2 w-full gap-5">
        {product.slice(0, 8).map((data, index) => (
          <Link href={`/products/${data._id}`} key={index}>
            <FurnitureCard data={data} type="origin" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CollectionSlider;
