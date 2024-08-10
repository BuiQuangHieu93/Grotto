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
import {
  deleteItemInCart,
  getCartByUserId,
  updateCart,
} from "@/lib/actions/cart.actions";
import { useAuth } from "@clerk/nextjs";
import { CartItem, OrderParams } from "@/types";
import CheckoutButton from "./CheckoutButton";

const Cart = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartProduct, setCartProduct] = useState<OrderParams>();
  const { userId } = useAuth();

  const fetchCart = async () => {
    if (userId) {
      try {
        const cart = await getCartByUserId(userId);
        setCartProduct(cart);
        setProducts(cart.items);
        setTotalPrice(cart.totalPrice);
        console.log("total Price", cart.totalPrice);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleAdd = async (product: CartItem["product"], quantity: number) => {
    try {
      const updatedItems = products.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      if (userId) {
        const updatedCart = await updateCart({
          userId: userId,
          items: updatedItems,
        });
        fetchCart();
      }
      setProducts(updatedItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleMinus = async (
    product: CartItem["product"],
    quantity: number
  ) => {
    try {
      const updatedItems = products.map((item) =>
        item.product._id === product._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      if (userId) {
        const updatedCart = await updateCart({
          userId: userId,
          items: updatedItems,
        });
        fetchCart();
      }
      setProducts(updatedItems);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemove = async (productId: string) => {
    if (userId) {
      try {
        await deleteItemInCart({ userId: userId, productId: productId });
        setProducts(products.filter((item) => item.product._id !== productId));
        const cart = await getCartByUserId(userId);
        fetchCart();
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-[#a6946b] group hover:bg-[#a6946b]"
          onClick={fetchCart}
        >
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
      <SheetContent className="min-w-[525px] h-full">
        <SheetHeader>
          <SheetTitle className="text-2xl">Main Cart</SheetTitle>
          <SheetDescription>
            Buy $1,740.00 and enjoy Free shipping within the USA.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between py-2">
            <span className="text-sm text-[#333333]">Product</span>
            <span className="text-sm text-[#333333]">Total</span>
          </div>
          <div className="w-full h-[1px] bg-[#666666] mb-2"></div>
          {products.map((item, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between py-2 w-full"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="w-[80px] h-[80px] relative pr-4">
                  <div className="w-[80px] h-[80px]">
                    <Image
                      src={item.product.images[0]}
                      layout="fill"
                      style={{ objectFit: "cover" }}
                      alt={item.product.title}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                      <div className="text-lg font-semibold">
                        {item.product.title}
                      </div>
                      <div className="text-gray-500">
                        $
                        {item.product.salePrice
                          ? item.product.salePrice.toFixed(2)
                          : item.product.originalPrice.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-lg font-semibold">
                      $
                      {item.product.salePrice
                        ? (item.product.salePrice * item.quantity).toFixed(2)
                        : (item.product.originalPrice * item.quantity).toFixed(
                            2
                          )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 justify-between">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <button
                        className="px-2 py-1 bg-white border-r hover:bg-[#a6946b] text-gray-900"
                        onClick={() => handleMinus(item.product, item.quantity)}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-[#e9e8e4] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleAdd(item.product, item.quantity)}
                        className="px-2 py-1 bg-white border-l hover:bg-[#a6946b] text-gray-900"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Image
                        src="/icon/trash.svg"
                        width={24}
                        height={24}
                        alt="trash"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="w-full h-[1px] bg-[#666666] mb-2"></div>
          <div className="flex flex- row justify-between">
            <span>Estimated total</span>
            <div>${totalPrice.toFixed(2)} USD</div>
          </div>
          <div>Taxes, discounts and shipping calculated at checkout</div>
          <SheetClose asChild>
            {cartProduct && <CheckoutButton products={cartProduct} />}
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
