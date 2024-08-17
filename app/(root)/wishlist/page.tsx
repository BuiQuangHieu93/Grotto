"use client";
import WishlistCard from "@/components/shared/WishlistCard";
import { getWishlistById } from "@/lib/actions/wishlist.actions";
import { IFurniture, IWishlist } from "@/types";
import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";

const Wishlist = () => {
  const [wishlists, setWishlists] = useState<IFurniture[]>([]);
  const { userId } = useAuth();
  useEffect(() => {
    const fetchWishlist = async () => {
      if (userId) {
        const wishlist = await getWishlistById(userId);
        setWishlists(wishlist);
      }
    };
    fetchWishlist();
    console.log(wishlists);
  }, [userId]);

  const handleDeleteProduct = (productId: string) => {
    setWishlists((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );
  };

  return (
    <div className="bg-[#e9e8e4] px-5 py-20">
      <div className="flex-center pb-20">
        <div className="text-4xl font-semibold">Wishlist</div>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {wishlists &&
          wishlists.map((wishlists) => (
            <WishlistCard
              data={wishlists}
              key={wishlists._id}
              onDelete={handleDeleteProduct}
            />
          ))}
      </div>
      {wishlists.length == 0 && (
        <div className="flex-center">
          <div className="text-xl">No item in Wishlist</div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
