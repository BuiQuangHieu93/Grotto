"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
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
import { CartItem, IFurniture, OrderParams } from "@/types";
import CheckoutButton from "./CheckoutButton";

const Cart = () => {
  const [products, setProducts] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartProduct, setCartProduct] = useState<OrderParams | null>(null);
  const { userId } = useAuth();

  const fetchCart = async () => {
    if (userId) {
      try {
        const cart = await getCartByUserId(userId);
        setCartProduct(cart);
        setProducts(cart.items);
        setTotalPrice(cart.totalPrice);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }
  };

  useEffect(() => {
    fetchCart();
    console.log("fetch cart:", cartProduct);
  }, [userId]);

  const handleAdd = async (product: CartItem["product"]) => {
    try {
      const updatedItems = products.map((item) =>
        item.product === product
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      if (userId) {
        await updateCart({ userId, items: updatedItems });
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleMinus = async (product: CartItem["product"]) => {
    try {
      const updatedItems = products.map((item) =>
        item.product === product && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      if (userId) {
        await updateCart({ userId, items: updatedItems });
        fetchCart();
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemove = async (productId: IFurniture) => {
    if (userId) {
      try {
        const updatedDeleteCart = await deleteItemInCart({
          userId,
          productId: productId._id,
        });
        console.log("here is update cart productId: ", updatedDeleteCart);
        await fetchCart();

        if (updatedDeleteCart.items.length === 0) {
          console.log("Cart is now empty.");
        }
      } catch (error) {
        console.error("Error removing item from cart:", error);
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="bg-[#a6946b] group hover:bg-[#8b7a56] transition duration-300"
          onClick={fetchCart}
        >
          <Image
            src="/icon/briefcase.svg"
            height={24}
            width={24}
            alt="briefcase"
            className="mr-2 group-hover:scale-110 transition duration-300"
          />
          <div className="font-normal">Cart</div>
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[525px] h-full p-6">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-[#333333]">
            Main Cart
          </SheetTitle>
          <SheetDescription className="text-[#555555] mt-2">
            {totalPrice < 300 ? (
              <div>
                Buy ${(300 - totalPrice).toFixed(2)} more to enjoy free shipping
                within the USA.
              </div>
            ) : (
              <div>Congratulations! Enjoy free shipping</div>
            )}
          </SheetDescription>
        </SheetHeader>

        {products.length === 0 ? (
          <div className="flex-center text-gray-500 h-[400px] ">
            <div> Your cart is empty.</div>
          </div>
        ) : (
          <>
            <div className="flex justify-between border-b pb-2">
              <span className="text-sm font-semibold text-[#333333]">
                Product
              </span>
              <span className="text-sm font-semibold text-[#333333]">
                Total
              </span>
            </div>
            <div className="flex flex-col space-y-6 mt-4 h-[400px] overflow-y-auto scroll">
              {products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b py-4"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className="w-[80px] h-[80px] relative">
                      {item.product && item.product.images?.[0] && (
                        <Image
                          src={item.product.images[0]}
                          layout="fill"
                          style={{ objectFit: "cover" }}
                          alt={item.product.title}
                        />
                      )}
                    </div>
                    <div className="flex flex-col w-full">
                      {item.product && (
                        <>
                          <div className="flex justify-between">
                            <div className="flex flex-col">
                              <span className="text-lg font-semibold text-[#333333]">
                                {item.product.title}
                              </span>
                              <span className="text-sm text-gray-500">
                                $
                                {item.product.salePrice
                                  ? item.product.salePrice.toFixed(2)
                                  : item.product.originalPrice.toFixed(2)}
                              </span>
                            </div>
                            <div className="text-lg font-semibold text-[#333333]">
                              $
                              {item.product.salePrice
                                ? (
                                    item.product.salePrice * item.quantity
                                  ).toFixed(2)
                                : (
                                    item.product.originalPrice * item.quantity
                                  ).toFixed(2)}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2 justify-between">
                            <div className="flex items-center border rounded-lg overflow-hidden">
                              <button
                                className="px-3 py-1 bg-white border-r hover:bg-[#a6946b] transition text-gray-900"
                                onClick={() => handleMinus(item.product)}
                              >
                                -
                              </button>
                              <span className="px-4 py-1 bg-[#e9e8e4] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleAdd(item.product)}
                                className="px-3 py-1 bg-white border-l hover:bg-[#a6946b] transition text-gray-900"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => handleRemove(item.product)}
                              className="text-gray-500 hover:text-red-500 transition"
                            >
                              <Image
                                src="/icon/trash.svg"
                                width={24}
                                height={24}
                                alt="trash"
                              />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        <div className="bg-[#f9f9f9] p-4 rounded-lg mt-6">
          <div className="flex justify-between text-lg font-semibold text-[#333333]">
            <span>Estimated total</span>
            <span>${totalPrice.toFixed(2)} USD</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Taxes, discounts, and shipping calculated at checkout
          </div>
        </div>

        <SheetClose asChild>
          {cartProduct && <CheckoutButton products={cartProduct} />}
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
