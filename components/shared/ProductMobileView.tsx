import { IFurniture } from "@/types";
import Image from "next/legacy/image";
import React, { useState } from "react";

const ProductMobileView: React.FC<{ product: IFurniture }> = ({ product }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="flex flex-col items-center bg-[#e9e8e4] p-4">
      {/* Main Image */}
      <div className="w-full h-auto mb-4">
        <Image
          src={product.images[selectedImageIndex]}
          alt={product.title}
          layout="responsive"
          width={300}
          height={300}
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center space-x-2 overflow-x-auto">
        {product.images.map((image, index) => (
          <button
            key={index}
            className={`border-2 ${
              selectedImageIndex === index
                ? "border-gray-800"
                : "border-transparent"
            } rounded-md p-1`}
            onClick={() => setSelectedImageIndex(index)}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              layout="intrinsic"
              width={50}
              height={50}
              objectFit="contain"
              className="rounded-md"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductMobileView;
