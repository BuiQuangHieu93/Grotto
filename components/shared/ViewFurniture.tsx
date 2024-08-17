"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { addItemsToCart } from "@/lib/actions/cart.actions";
import { IFurniture } from "@/types";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import CheckoutButton from "./CheckoutButton";
import Link from "next/link";

const ViewFurniture = ({ data }: { data: IFurniture }) => {
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

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#a6946b] p-2 rounded-md hover:bg-[#8a7a57]">
            <div className="h-[24px] w-[24px] relative">
              <Image src="/icon/eye-on.svg" height={24} width={24} alt="View" />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] min-w-[1000px] bg-[#e9e8e4]">
          {data && (
            <div className="flex flex-row space-x-4">
              <div className="w-[450px] h-[450px] relative">
                <Image
                  src={data.images[0]}
                  layout="fill"
                  alt={data.title}
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="flex flex-col w-1/2">
                <div className="font-semibold text-2xl">{data.title}</div>

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

                <div className="mt-2">Available: {data.available}</div>

                <div className="flex items-center mt-4">
                  <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                    <Button
                      onClick={() => setValue(value > 1 ? value - 1 : 1)}
                      className="bg-white px-4 py-2 hover:bg-gray-100 text-gray-900"
                    >
                      -
                    </Button>
                    <span className="px-6 py-2 bg-[#e9e8e4] text-center">
                      {value}
                    </span>
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

                <CheckoutButton
                  products={{
                    userId: userId || "",
                    items: data ? [{ product: data, quantity: value }] : [],
                    totalPrice: data
                      ? data.salePrice
                        ? data.salePrice * value
                        : data.originalPrice * value
                      : 0,
                  }}
                />
                <Link
                  href={`/products/${data._id}`}
                  className="uppercase text-sm mt-2 hover:text-[#8a7a57] flex flex-row"
                >
                  <span className="pr-2">View Product details</span>
                  <Image
                    src="/icon/arrow-forward-outline.svg"
                    width={16}
                    height={16}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewFurniture;
