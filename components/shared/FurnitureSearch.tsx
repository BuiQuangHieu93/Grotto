"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllFurniture } from "@/lib/actions/product.actions";
import { IFurniture } from "@/types";

const FurnitureSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [furnitureItems, setFurnitureItems] = useState<IFurniture[]>([]);
  const [filteredFurniture, setFilteredFurniture] = useState<IFurniture[]>([]);
  const router = useRouter(); // Use Next.js router for navigation

  useEffect(() => {
    // Fetch all furniture items when the component mounts
    const fetchFurniture = async () => {
      const items = await getAllFurniture();
      setFurnitureItems(items);
    };

    fetchFurniture();
  }, []);

  useEffect(() => {
    // Filter furniture items based on the query
    if (query) {
      const filtered = furnitureItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredFurniture(filtered);
    } else {
      setFilteredFurniture([]);
    }
  }, [query, furnitureItems]);

  const handleResultClick = (id: string) => {
    // Navigate to the product page and reset the query to close the dropdown
    router.push(`/products/${id}`);
    setQuery("");
  };

  return (
    <div className="relative">
      <div className="flex bg-white h-12 w-80 items-center rounded-lg shadow">
        <Input
          className="focus-visible:ring-transparent border-none w-[85%] ml-2"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Image src="/icon/search.svg" height={24} width={24} alt="search" />
      </div>

      {filteredFurniture.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-20">
          {filteredFurniture.map((item) => (
            <div
              key={item._id}
              className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleResultClick(item._id)}
            >
              <div className="flex items-center">
                <Image
                  src={item.images[0]}
                  height={40}
                  width={40}
                  alt={item.title}
                  className="mr-2"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{item.title}</span>
                  <span className="text-sm text-gray-600">
                    {item.salePrice ? (
                      <div className="flex flex-row">
                        <span className="line-through mr-2">
                          ${item.originalPrice}
                        </span>
                        <span>${item.salePrice}</span>
                      </div>
                    ) : (
                      <span>${item.originalPrice}</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FurnitureSearch;
