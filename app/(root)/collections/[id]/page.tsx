"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FurnitureTrending } from "@/constants";
import FurnitureCard from "@/components/shared/FurnitureCard";
import { Checkbox } from "@/components/ui/checkbox";
import RangeSlider from "@/components/shared/RangeSlider";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [place, setPlace] = useState("first");
  const [listType, setListType] = useState("three");
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 320]);

  const handleSortChange = (value: any) => {
    setSortOption(value);
  };

  const filterAndSortFurniture = () => {
    let filteredData = FurnitureTrending;

    filteredData = filteredData.filter((item) => item.available > 0);

    filteredData = filteredData.filter(
      (item) =>
        item.salePrice >= priceRange[0] && item.salePrice <= priceRange[1]
    );

    // Sort the filtered data
    switch (sortOption) {
      case "featured":
        filteredData.sort((a, b) => b.feature - a.feature);
        break;
      case "bestSelling":
        filteredData.sort((a, b) => b.bestSelling - a.bestSelling);
        break;
      case "alphabeticalAZ":
        filteredData.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alphabeticalZA":
        filteredData.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "priceHighToLow":
        filteredData.sort((a, b) => b.salePrice - a.salePrice);
        break;
      case "priceLowToHigh":
        filteredData.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case "dateNewToOld":
        filteredData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "dateOldToNew":
        filteredData.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      default:
        break;
    }

    return filteredData;
  };

  const filteredAndSortedFurniture = filterAndSortFurniture();

  return (
    <>
      <div className="bg-[#e9e8e4] px-4 pb-20">
        <div className="py-12">
          <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center ">
            Furniture 1
          </div>
        </div>
        <div className="grid grid-cols-4">
          <div className="flex flex-col w-full pr-8">
            <div className="bg-white text-base text-[#333333] font-semibold p-2 mb-5 rounded-lg border border-[#2b4d42]">
              Filter:
            </div>

            <div className="flex flex-col border border-[#2b4d42] mb-5 rounded-lg">
              <button
                onClick={() => setOpen(!open)}
                className={`bg-white text-base text-[#333333] font-semibold p-2 border flex justify-between w-full ${
                  open ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <span>Available</span>
                <div className="flex-center h-full">
                  <Image
                    src="/icon/arrow-up-1.svg"
                    width={16}
                    height={16}
                    alt="up"
                    className={`${open ? "" : "rotate-180"}`}
                  />
                </div>
              </button>
              {open && (
                <div>
                  <div className="flex items-center space-x-2 p-4">
                    <Checkbox id="terms" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-[#a6946b]"
                    >
                      In stock ({FurnitureTrending.length})
                    </label>
                  </div>
                  <div className="flex items-center space-x-2 p-4">
                    <Checkbox id="terms2" disabled />
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 hover:text-[#a6946b]"
                    >
                      Out of stock (0)
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col border border-[#2b4d42] mb-5 rounded-lg">
              <button
                onClick={() => setOpenPrice(!openPrice)}
                className={`bg-white text-base text-[#333333] font-semibold p-2 border flex justify-between w-full ${
                  openPrice ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <span>Price Range</span>
                <div className="flex-center h-full">
                  <Image
                    src="/icon/arrow-up-1.svg"
                    width={16}
                    height={16}
                    alt="up"
                    className={`${openPrice ? "" : "rotate-180"}`}
                  />
                </div>
              </button>
              {openPrice && (
                <div>
                  <RangeSlider
                    min={0}
                    max={320}
                    step={1}
                    priceGap={1}
                    values={priceRange}
                    onChange={setPriceRange}
                  />
                </div>
              )}
            </div>

            <div className="mb-5 rounded-lg border border-[#2b4d42] w-full">
              <div
                className={`bg-white text-base text-[#333333] font-semibold p-2 border flex justify-between w-full ${
                  place === "first" ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <button
                  onClick={() => setPlace("first")}
                  className="w-full text-left"
                >
                  Furniture
                </button>
              </div>
              {place === "first" && (
                <div className="p-4 text-[#666666]">
                  Hooker: Redefining Furniture with regal finesse. Elevate your
                  wardrobe with our trendsetting clothing theme, where elegance
                  meets modernity. Rule the style kingdom with Badshah's
                  SEO-optimized apparel collection.
                </div>
              )}
            </div>

            <div className="mb-5 rounded-lg border border-[#2b4d42] w-full">
              <div
                className={`bg-white text-base text-[#333333] font-semibold p-2 border flex justify-between w-full ${
                  place === "second" ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <button
                  onClick={() => setPlace("second")}
                  className="w-full text-left"
                >
                  Furniture
                </button>
              </div>
              {place === "second" && (
                <div className="p-4 text-[#666666]">
                  Hooker: Redefining Furniture with regal finesse. Elevate your
                  wardrobe with our trendsetting clothing theme, where elegance
                  meets modernity. Rule the style kingdom with Badshah's
                  SEO-optimized apparel collection.
                </div>
              )}
            </div>
          </div>

          <div className="col-span-3">
            <div className="bg-[#ffffff] w-full flex justify-between p-4 mb-16">
              <div>
                <Button
                  className="bg-[#a6946b] w-9 h-9 px-0 py-0 mx-1"
                  onClick={() => setListType("three")}
                >
                  <Image
                    src="/icon/line-horizontal-3.svg"
                    width={20}
                    height={20}
                    alt="line-horizontal-3"
                    className="rotate-90"
                  />
                </Button>
                <Button
                  className="bg-[#a6946b] w-9 h-9 px-0 py-0 mx-1"
                  onClick={() => setListType("two")}
                >
                  <Image
                    src="/icon/menu.svg"
                    width={20}
                    height={20}
                    alt="menu"
                    className="rotate-90"
                  />
                </Button>
                <Button
                  className="bg-[#a6946b] w-9 h-9 px-0 py-0 mx-1"
                  onClick={() => setListType("one")}
                >
                  <Image
                    src="/icon/line-horizontal-3.svg"
                    width={20}
                    height={20}
                    alt="line-horizontal-3"
                  />
                </Button>
              </div>
              <div className="flex flex-row">
                <div className="text-sm flex-center mr-2">Sort by:</div>
                <div>
                  <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-44 bg-gray-100 focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus-ring-0 border-none focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Featured" />
                    </SelectTrigger>
                    <SelectContent className="absolute">
                      <SelectGroup>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="bestSelling">
                          Best Selling
                        </SelectItem>
                        <SelectItem value="alphabeticalAZ">
                          Alphabetical A-Z
                        </SelectItem>
                        <SelectItem value="alphabeticalZA">
                          Alphabetical Z-A
                        </SelectItem>
                        <SelectItem value="priceHighToLow">
                          Price High to Low
                        </SelectItem>
                        <SelectItem value="priceLowToHigh">
                          Price Low to High
                        </SelectItem>
                        <SelectItem value="dateNewToOld">
                          Date New to Old
                        </SelectItem>
                        <SelectItem value="dateOldToNew">
                          Date Old to New
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="bg-[#e9e8e4] px-2 rounded-xl font-semibold text-sm flex-center">
                {filteredAndSortedFurniture.length} of{" "}
                {FurnitureTrending.length} products
              </div>
            </div>
            <div
              className={`grid gap-8 ${
                listType === "three"
                  ? "grid-cols-3"
                  : listType === "two"
                  ? "grid-cols-2"
                  : listType === "one"
                  ? "grid-cols-1"
                  : ""
              }`}
            >
              {filteredAndSortedFurniture.map((data, index) => (
                <div key={index} className="mb-4">
                  <FurnitureCard
                    data={data}
                    type={listType === "one" ? "horizon" : "origin"}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
