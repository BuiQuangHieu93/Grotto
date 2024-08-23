"use client";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAllFurniture } from "@/lib/actions/product.actions";
import { IFurniture } from "@/types";
import { FaTimes } from "react-icons/fa";

const FurnitureSearch: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const [furnitureItems, setFurnitureItems] = useState<IFurniture[]>([]);
  const [filteredFurniture, setFilteredFurniture] = useState<IFurniture[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFurniture = async () => {
      setLoading(true);
      try {
        const items = await getAllFurniture();
        setFurnitureItems(items);
      } catch (err) {
        setError("Failed to fetch furniture items");
      } finally {
        setLoading(false);
      }
    };

    fetchFurniture();
  }, []);

  useEffect(() => {
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
    router.push(`/products/${id}`);
    setQuery("");
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
        <Input
          className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="relative w-8 h-8">
          {query ? (
            <button
              className="absolute right-0 p-2"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <FaTimes className="text-gray-500" />
            </button>
          ) : (
            <div className="relative w-6 h-6">
              <Image
                src="/icon/search.svg"
                layout="fill"
                alt="search"
                className="ml-2 mt-1"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 p-2 text-red-600">
          {error}
        </p>
      )}

      {filteredFurniture.length > 0 && !loading && !error && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 max-h-60 overflow-y-auto z-20">
          {filteredFurniture.map((item) => (
            <div
              key={item._id}
              className="p-2 border-b border-gray-200 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => handleResultClick(item._id)}
            >
              <Image
                src={item.images[0]}
                height={40}
                width={40}
                alt={item.title}
                className="mr-2 rounded"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{item.title}</span>
                <span className="text-sm text-gray-600">
                  {item.salePrice ? (
                    <div className="flex flex-row">
                      <span className="line-through mr-2">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                      <span>${item.salePrice.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>${item.originalPrice.toFixed(2)}</span>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FurnitureSearch;
