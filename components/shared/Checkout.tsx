import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

import { Button } from "../ui/button";
import { checkoutOrder } from "@/lib/actions/order.actions";
import { OrderParams } from "@/types";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({
  products,
  userId,
}: {
  products: OrderParams;
  userId: string;
}) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  const onCheckout = async () => {
    const order = {
      userId: userId,
      items: products.items,
      totalPrice: products.totalPrice,
    };

    try {
      const response = await checkoutOrder(order);

      if (response?.redirect) {
        window.location.href = response.redirect;
      } else {
        console.error(
          "Failed to obtain the redirection URL or the response was undefined."
        );
      }
    } catch (error) {
      console.error("Error during checkout: ", error);
    }
  };

  return (
    <form action={onCheckout} method="post">
      <Button type="submit" role="link" size="lg" className="button sm:w-fit">
        Checkout
      </Button>
    </form>
  );
};

export default Checkout;
