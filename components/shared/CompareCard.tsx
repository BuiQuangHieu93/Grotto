"use client";
import { CompareCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import { removeProductInWishlist } from "@/lib/actions/wishlist.actions";
import Link from "next/link";

const CompareCard: React.FC<CompareCardProps> = ({ data, onDelete }) => {
  const { userId } = useAuth();

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

  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Link
      className="bg-white border rounded shadow-md p-4 max-w-sm mx-auto"
      href={`/products/${data._id}`}
    >
      <table className="w-full border border-gray-300">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="relative p-2">
              <Image
                src={data.images[0]}
                alt={data.title}
                width={300}
                height={200}
                className="object-cover w-full h-auto rounded"
              />
              <Button
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full"
                onClick={() => handleDelete()}
              >
                <Image
                  src="/icon/trash.svg"
                  width={24}
                  height={24}
                  alt="remove"
                />
              </Button>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center text-lg font-semibold py-2">
              {data.title}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center font-semibold py-2">
              {data.salePrice ? (
                <div className="flex-center mt-2">
                  <div className="line-through text-gray-500 mr-2">
                    ${data.originalPrice.toFixed(2)} USD
                  </div>
                  <div className="text-red-500 font-semibold">
                    ${data.salePrice.toFixed(2)} USD
                  </div>
                </div>
              ) : (
                <div className="text-xl font-bold text-black">
                  ${data.originalPrice.toFixed(2)} USD
                </div>
              )}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center text-lg font-semibold py-2">
              <div className="ml-2 text-sm text-green-600">
                Save:{" "}
                {data.salePrice &&
                  calPercentSale(data.originalPrice, data.salePrice)}
                % OFF
              </div>
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="text-center py-2">
              Category: {capitalizeWords(data.category) || "N/A"}
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center py-2">
              Type: {capitalizeWords(data.type) || "N/A"}
            </td>
          </tr>
          <tr>
            <td className="text-center py-2">
              Availability: {data.available > 0 ? "In Stock" : "Out of Stock"}
            </td>
          </tr>
        </tbody>
      </table>
    </Link>
  );
};

export default CompareCard;
