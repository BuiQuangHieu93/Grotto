"use client";

import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import { OrderParams } from "@/types";

const CheckoutButton = ({ products }: { products: OrderParams }) => {
  const { user } = useUser();
  const userId = user?.id || ""; // Correctly accessing the Clerk user ID

  return (
    <div className="flex items-center gap-3 w-full">
      <>
        <SignedOut>
          <Button asChild className="button rounded-full" size="lg">
            <Link href="/sign-in">Get Furniture</Link>
          </Button>
        </SignedOut>

        <SignedIn>
          <Checkout products={products} userId={userId} />
        </SignedIn>
      </>
    </div>
  );
};

export default CheckoutButton;
