import React from "react";

import Image from "next/image";
import { Furniture } from "@/types";

const ProductCard = (product: Furniture) => {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center">
      <Image
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-lg"
        height={48}
        width={48}
      />
      <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
      <p className="text-gray-600">
        ${product.salePrice}{" "}
        <span className="line-through">${product.originalPrice}</span>
      </p>
      <button className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
