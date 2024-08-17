"use client";
import { CompareCardProps } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { removeProductInCompare } from "@/lib/actions/compare.actions";

const CompareCard: React.FC<CompareCardProps> = ({ data, onDelete }) => {
  const { userId } = useAuth();

  const calPercentSale = (originPrice: number, salePrice: number) => {
    return (((originPrice - salePrice) * 100) / originPrice).toFixed(0);
  };

  const handleDelete = async () => {
    if (userId) {
      const deleteItem = await removeProductInCompare(userId, data);

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
    <div className="bg-white border rounded shadow-md p-4 max-w-sm mx-auto">
      <table className="w-full border border-gray-300">
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="relative p-2">
              <Link href={`/products/${data._id}`}>
                <Image
                  src={data.images[0]}
                  alt={data.title}
                  width={300}
                  height={200}
                  className="object-cover w-full h-auto rounded"
                />
              </Link>
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
            <td className="text-center text-lg font-semibold py-2 line-clamp-1">
              <Link href={`/products/${data._id}`}>{data.title}</Link>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center font-semibold py-2">
              <Link href={`/products/${data._id}`}>
                {data.salePrice ? (
                  <div className="flex justify-center mt-2">
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
              </Link>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center text-lg font-semibold py-2">
              <Link href={`/products/${data._id}`}>
                <div className="ml-2 text-sm text-green-600">
                  Save:{" "}
                  {data.salePrice &&
                    calPercentSale(data.originalPrice, data.salePrice)}
                  % OFF
                </div>
              </Link>
            </td>
          </tr>

          <tr className="border-b border-gray-300">
            <td className="text-center py-2">
              <Link href={`/products/${data._id}`}>
                Category: {capitalizeWords(data.category) || "N/A"}
              </Link>
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="text-center py-2">
              <Link href={`/products/${data._id}`}>
                Type: {capitalizeWords(data.type) || "N/A"}
              </Link>
            </td>
          </tr>
          <tr>
            <td className="text-center py-2">
              <Link href={`/products/${data._id}`}>
                Availability: {data.available > 0 ? "In Stock" : "Out of Stock"}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CompareCard;
