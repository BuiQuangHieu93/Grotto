import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FurnitureData, IFurniture } from "@/types";
import Link from "next/link";
import { addItemsToCart } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import ViewFurniture from "./ViewFurniture";
import {
  addProductToWishlist,
  checkProductWishlist,
  removeProductInWishlist,
} from "@/lib/actions/wishlist.actions";
import { addProductToCompare } from "@/lib/actions/compare.actions";

const FurnitureCard = ({ data, type }: FurnitureData) => {
  const [hover, setHover] = useState(false);
  const [checkWishlist, setCheckWishlist] = useState(false);
  const { userId } = useAuth();

  useEffect(() => {
    const checkWishlistF = async (data: IFurniture) => {
      if (userId) {
        const check = await checkProductWishlist(userId, data);
        setCheckWishlist(check);
      }
    };
    checkWishlistF(data);
  }, [userId, data]);

  const handleAddToCart = async () => {
    if (data && userId) {
      const addItem = await addItemsToCart({
        userId,
        items: [{ product: data, quantity: 1 }],
      });
      console.log(addItem);
    } else {
      console.error("Product ID or User ID is missing");
    }
  };

  const handleAddToWishlist = async (data: IFurniture) => {
    if (userId) {
      await addProductToWishlist(userId, data);
      setCheckWishlist(true);
    }
  };
  const handleAddToCompare = async (data: IFurniture) => {
    if (userId) {
      await addProductToCompare(userId, data);
      setCheckWishlist(true);
    }
  };

  const handleRemoveItemWishlist = async (data: IFurniture) => {
    if (userId) {
      await removeProductInWishlist(userId, data);
      setCheckWishlist(false);
    }
  };

  const handleModifyWishlist = () => {
    if (checkWishlist) {
      handleRemoveItemWishlist(data);
    } else {
      handleAddToWishlist(data);
    }
  };

  const generateNumber = (number?: number) => {
    return number === undefined ? "0.00" : number.toFixed(2);
  };

  const calculateSale = (originalPrice: number, salePrice: number) => {
    return ((1 - salePrice / originalPrice) * 100).toFixed(0);
  };

  return (
    <div className={`flex ${type === "horizon" ? "flex-row" : "flex-col"}`}>
      <div
        className={`relative group overflow-hidden ${
          type === "horizon" ? "pr-4" : ""
        }`}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={`relative overflow-hidden`}>
          <Link href={`/products/${data._id}`}>
            <Image
              src={hover ? data?.imageHover : data?.images?.[0]}
              height={600}
              width={600}
              alt="furniture"
              className={`transition-transform duration-500 ease-in-out relative ${
                hover ? "scale-110 opacity-90" : "scale-100 opacity-100"
              }`}
              onClick={(e) => e.stopPropagation()} // Prevent click propagation to Link
            />
          </Link>
          {hover && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <ViewFurniture data={data} />

              <Button
                className="bg-[#a6946b] p-2 rounded-md w-10"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent Link navigation
                  handleAddToCart();
                }}
              >
                <div className="w-[20px] h-[20px] relative">
                  <Image
                    src="/icon/briefcase.svg"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    alt="Add to Cart"
                    className="fill-white"
                  />
                </div>
              </Button>

              <Button
                className="bg-[#a6946b] p-2 rounded-md w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleModifyWishlist();
                }}
              >
                <div className="w-[20px] h-[20px] relative">
                  <Image
                    src={
                      checkWishlist
                        ? "/icon/star.svg"
                        : "/icon/star-outline.svg"
                    }
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    alt="Favorite"
                  />
                </div>
              </Button>

              <Button
                className="bg-[#a6946b] p-2 rounded-md w-10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCompare(data);
                }} // Prevent Link navigation
              >
                <div className="w-[20px] h-[20px] relative">
                  <Image
                    src="/icon/customer-information-list.svg"
                    layout="fill"
                    style={{ objectFit: "cover" }}
                    alt="Info"
                  />
                </div>
              </Button>
            </div>
          )}
        </div>
        {data?.salePrice && (
          <div className="absolute top-4 left-4 h-6 w-14 rounded-lg bg-[#a6946b] flex items-center justify-center transition-all duration-500 ease-in-out text-xs text-white">
            - {calculateSale(data.originalPrice, data.salePrice)}%
          </div>
        )}
      </div>
      <Link href={`/products/${data._id}`}>
        <div
          className={`font-semibold transition-colors duration-500 ease-in-out pt-4 ${
            hover ? "text-[#a6946b]" : "text-[#333333]"
          }`}
        >
          {data?.title}
        </div>
        <div className="flex pt-2">
          <div className="text-[#666666] line-through mr-4">
            ${generateNumber(data?.originalPrice)} USD
          </div>
          {data.salePrice && (
            <div className="font-semibold">
              ${generateNumber(data?.salePrice)} USD
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default FurnitureCard;
