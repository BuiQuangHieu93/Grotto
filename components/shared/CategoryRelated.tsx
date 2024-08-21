import { GetFurnitureByCategory } from "@/lib/actions/product.actions";
import { CategoryRelatedProps, IFurniture } from "@/types";
import React, { useEffect, useState } from "react";
import FurnitureCard from "./FurnitureCard";

const CategoryRelated = ({ category, id }: CategoryRelatedProps) => {
  const [products, setProducts] = useState<IFurniture[]>([]);

  useEffect(() => {
    const fetchRelatedProduct = async () => {
      const product = await GetFurnitureByCategory(category);
      setProducts(product);
    };
    fetchRelatedProduct();
  }, [category]);

  // Filter out the current product from the related products
  const relatedProduct = products.filter((item) => item._id !== id);

  return (
    <div className="flex flex-col pb-20">
      <div className="md:text-4xl text-2xl font-semibold uppercase py-20 md:text-left px-5 flex-center">
        <div>You may also like</div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-5">
        {relatedProduct.slice(0, 4).map((product) => (
          <FurnitureCard data={product} type="origin" key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default CategoryRelated;
