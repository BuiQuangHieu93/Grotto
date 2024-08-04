"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { getCartByUserId } from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import { CartItem } from "@/types";

const Cart = () => {
  // const [product, setProduct] = useState<CartItem>([]);
  // const { userId } = useAuth();
  // useEffect(() => {
  //   const fetchCart = () => {
  //     if (userId) {
  //       const product = getCartByUserId(userId);
  //       setProduct(product);
  //     }
  //   };
  //   fetchCart();
  // }, [userId]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#a6946b] group hover:bg-[#a6946b]">
          <Image
            src="/icon/briefcase.svg"
            height={24}
            width={24}
            alt="briefcase"
            className="mr-2 group-hover:scale-110 duration-300"
          />
          <div className="font-normal">Cart</div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Main Cart</SheetTitle>
          <SheetDescription>
            Buy $1,740.00 enjoy Free shipping within USA.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between py-2">
            <span className="text-sm text-[#333333] ">Product</span>
            <span className="text-sm text-[#333333]">Total</span>
          </div>
          <div className="w-full h-[1px] bg-[#666666] mb-2"></div>
          {}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
