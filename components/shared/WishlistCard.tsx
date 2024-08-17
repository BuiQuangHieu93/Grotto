"use client";
import { WishlistCardProps } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { addItemsToCart } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import { removeProductInWishlist } from "@/lib/actions/wishlist.actions";

const WishlistCard: React.FC<WishlistCardProps> = ({ data, onDelete }) => {
  const [value, setValue] = useState<number>(1);
  const { userId } = useAuth();
  const handleAddToCart = async () => {
    if (data && userId) {
      const addItem = await addItemsToCart({
        userId,
        items: [{ product: data, quantity: value }],
      });
      console.log(addItem);
    } else {
      console.error("Product ID or User ID is missing");
    }
  };
  const calPercentSale = (originPrice: number, salePrice: number) => {
    return (((originPrice - salePrice) * 100) / originPrice).toFixed(0);
  };

  const handleDelete = async () => {
    if (userId) {
      const deleteItem = await removeProductInWishlist(userId, data);

      if (deleteItem) {
        onDelete(data._id);
      }
    }
  };

  return (
    <div>
      <div className="w-full h-0 pb-[100%] bg-white p-4 shadow rounded relative">
        <Image
          src={data.images[0]}
          layout="fill"
          style={{ objectFit: "cover" }}
          alt={data.title}
        />
        <Button
          className="absolute top-1 right-1 bg-[#e9e8e4]"
          onClick={() => handleDelete()}
        >
          <div className="w-[24px] h-[24px] relative">
            <Image
              src="/icon/trash.svg"
              layout="fill"
              style={{ objectFit: "cover" }}
              alt="remove"
            />
          </div>
        </Button>
      </div>
      <div className="font-semibold pt-5">{data.title}</div>
      {data.salePrice ? (
        <div className="flex items-center mt-2">
          <div className="line-through text-gray-500 mr-2">
            ${data.originalPrice.toFixed(2)} USD
          </div>
          <div className="text-red-500 font-semibold">
            ${data.salePrice.toFixed(2)} USD
          </div>
          <div className="ml-2 text-sm text-green-600">
            {calPercentSale(data.originalPrice, data.salePrice)}% OFF
          </div>
        </div>
      ) : (
        <div className="text-xl font-bold text-black">
          ${data.originalPrice.toFixed(2)} USD
        </div>
      )}

      <div className="flex items-center mt-4">
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <Button
            onClick={() => setValue(value > 1 ? value - 1 : 1)}
            className="bg-white px-4 py-2 hover:bg-gray-100 text-gray-900"
          >
            -
          </Button>
          <span className="px-6 py-2 bg-[#e9e8e4] text-center">{value}</span>
          <Button
            onClick={() => setValue(value + 1)}
            className="bg-white px-4 py-2 hover:bg-gray-100 text-gray-900"
          >
            +
          </Button>
        </div>
        <Button
          className="ml-4 py-2 px-6 bg-[#d3c3a4] text-white rounded-md hover:bg-[#b09e82] flex-grow"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default WishlistCard;
