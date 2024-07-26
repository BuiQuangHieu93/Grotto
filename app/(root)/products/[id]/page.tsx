"use client";

import ImageZoom from "@/components/shared/ImageZoom";
import { Button } from "@/components/ui/button";
import { dataEachProduct } from "@/constants";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const [value, setValue] = useState<number>(1);
  const product = useParams();
  console.log(product.id);

  //  find id and display as object

  return (
    <div className="grid grid-cols-2 gap-6 px-5 py-20 bg-[#e9e8e4]">
      <div className="grid grid-cols-2 gap-8">
        {dataEachProduct.map((image, index) => (
          <div key={index} className={index === 0 ? "col-span-2" : ""}>
            <ImageZoom
              src={image.image}
              alt="Magnified Image"
              width={750}
              height={250}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-4 mr-32 ml-20 sticky top-0 items-start h-[550px]">
        <div className="text-sm text-[#666666]">Home furniture</div>
        <div className="text-3xl font-medium">Decade Stacking Chair</div>
        <div className="text-base">
          <span className="line-through font-normal text-[#666666]">
            $160.00 USD
          </span>
          <span className="font-semibold text-lg ml-2">$150.00 USD</span>
          <span className="bg-[#d3c3a4] text-gray-100 text-xs ml-2 px-2.5 py-0.5 rounded-sm">
            Sale
          </span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-[#333333] font-normal">
          <svg
            fill="none"
            height="20"
            viewBox="0 0 32 32"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
            className="animate-changeColor"
          >
            <g
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path d="m15.9998 7.00133c-5.3747-.09066-10.93336 3.66537-14.42803 7.51197-.36682.4073-.56982.9359-.56982 1.484s.203 1.0768.56982 1.484c3.41867 3.7654 8.96133 7.608 14.42803 7.516 5.4666.092 11.0106-3.7506 14.432-7.516.3668-.4072.5698-.9359.5698-1.484s-.203-1.0767-.5698-1.484c-3.4987-3.8466-9.0574-7.60263-14.432-7.51197z" />
              <path d="m21 16c-.0003.9888-.2937 1.9554-.8433 2.7775-.5496.822-1.3306 1.4627-2.2442 1.8409-.9137.3783-1.9189.4771-2.8888.284-.9698-.1931-1.8606-.6694-2.5597-1.3687s-1.1752-1.5902-1.368-2.5601-.0937-1.9751.2847-2.8887c.3785-.9135 1.0194-1.6943 1.8416-2.2437.8222-.5493 1.7889-.8425 2.7777-.8425.6568-.0002 1.3071.129 1.9139.3803s1.1582.6197 1.6225 1.0842.8326 1.0159 1.0837 1.6228c.2512.6068.3803 1.2572.3799 1.914z" />
            </g>
          </svg>
          <span>27 people are viewing this right now</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-[#333333] font-normal">
          <svg
            height="20"
            viewBox="0 0 56 56"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m27.9999 51.9063c13.0547 0 23.9064-10.8282 23.9064-23.9063 0-13.0547-10.8751-23.9063-23.9298-23.9063-13.0782 0-23.8828 10.8516-23.8828 23.9063 0 13.0781 10.8281 23.9063 23.9062 23.9063zm0-3.9844c-11.0625 0-19.8985-8.8594-19.8985-19.9219 0-11.0391 8.8126-19.9219 19.8751-19.9219 11.039 0 19.9218 8.8828 19.9454 19.9219.0235 11.0625-8.8829 19.9219-19.922 19.9219zm-8.0156-9.9844c.5156 0 .9844-.2109 1.3359-.5859l6.6563-6.6797 6.6562 6.6797c.3516.3515.8203.5859 1.3594.5859 1.0313 0 1.875-.8672 1.875-1.8985 0-.539-.2109-.9843-.5625-1.3359l-6.6563-6.6562 6.6797-6.7032c.375-.3984.5625-.7968.5625-1.3125 0-1.0546-.8437-1.8749-1.875-1.8749-.4921 0-.9141.164-1.3125.5625l-6.7265 6.7031-6.7032-6.6797c-.3515-.375-.7734-.5391-1.289-.5391-1.0547 0-1.875.7969-1.875 1.8516 0 .5156.1875.9609.5625 1.3125l6.6562 6.6797-6.6562 6.6797c-.375.3281-.5625.7968-.5625 1.3124 0 1.0313.8203 1.8985 1.875 1.8985z" />
          </svg>
          <span>Sold 30 products in the last 6 hours</span>
        </div>
        <div className="flex space-x-2">
          <Button className="bg-[#a6946b] p-2 rounded-md">
            <Image
              src="/icon/star-outline.svg"
              height={20}
              width={20}
              alt="Favorite"
            />
          </Button>
          <Button className="bg-[#a6946b] p-2 rounded-md">
            <Image
              src="/icon/customer-information-list.svg"
              height={20}
              width={20}
              alt="Info"
            />
          </Button>
        </div>
        <div className="text-sm text-[#333333] font-normal flex items-center space-x-1">
          <span>Availability:</span>
          <div className="flex items-center px-1">
            <svg width="15" height="15" aria-hidden="true">
              <circle
                cx="7.5"
                cy="7.5"
                r="7.5"
                fill="rgba(62,214,96, 0.3)"
              ></circle>
              <circle
                cx="7.5"
                cy="7.5"
                r="5"
                stroke="rgb(255, 255, 255)"
                strokeWidth="1"
                fill="rgb(62,214,96)"
              ></circle>
            </svg>
          </div>
          <span>Only 50 left in stock!</span>
        </div>
        <div className="w-full h-1 bg-gray-900 my-4 rounded-full"></div>
        <div className="text-sm text-[#333333] font-normal">Quantity</div>
        <div className="flex-row w-full flex">
          <div className="flex-center h-full">
            <div className="flex-center border-[1px] border-black rounded-lg">
              <Button
                onClick={() => setValue(value > 1 ? value - 1 : 1)}
                className="bg-[#ffffff] rounded-l-md hover:bg-[#a6946b] text-gray-900"
              >
                -
              </Button>
              <span className=" bg-[#e9e8e4] border w-10 text-center">
                {value}
              </span>
              <Button
                onClick={() => setValue(value + 1)}
                className="bg-[#ffffff] rounded-r-md hover:bg-[#a6946b] text-gray-900"
              >
                +
              </Button>
            </div>
          </div>
          <div className="flex-center h-full w-full ml-2">
            <Button className="py-2 bg-[#d3c3a4] text-white w-full uppercase">
              Add to cart
            </Button>
          </div>
        </div>

        <Button className="mt-2 py-2 bg-[#333333] text-white w-full hover:bg-[#d3c3a4] uppercase">
          Buy it now
        </Button>
        <div className="text-sm text-[#333333] font-normal mt-4">
          Categories:{" "}
          <a href="#" className="underline text-[#666666]">
            Furniture 2
          </a>
        </div>
        <Button className="flex items-center mt-2 py-2 bg-[#333333] text-white w-[20%]">
          <Image
            src="/icon/upload-share.svg"
            width={12}
            height={12}
            alt="share"
          />
          <span className="ml-2">Share</span>
        </Button>
      </div>
    </div>
  );
};

export default Page;
