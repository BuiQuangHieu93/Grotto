"use client";
import CompareCard from "@/components/shared/CompareCard";
import { getCompareById } from "@/lib/actions/compare.actions";
import { IFurniture } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Compare = () => {
  const [compares, setCompares] = useState<IFurniture[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const fetchCompare = async () => {
      if (userId) {
        const compares = await getCompareById(userId);
        setCompares(compares);
      }
    };
    fetchCompare();
  }, [userId]);

  const handleDeleteProduct = (productId: string) => {
    setCompares((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="bg-[#e9e8e4] px-5 py-20">
      <div className="flex justify-center pb-20">
        <div className="text-3xl md:text-4xl font-semibold">Compare</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {compares &&
          compares.map((compares) => (
            <CompareCard
              data={compares}
              key={compares._id}
              onDelete={handleDeleteProduct}
            />
          ))}
      </div>
      {compares.length === 0 && (
        <div className="flex justify-center">
          <div className="text-lg md:text-xl">No item in Compare</div>
        </div>
      )}
    </div>
  );
};

export default Compare;
