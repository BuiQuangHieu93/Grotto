import Stripe from "stripe";
import { NextResponse } from "next/server";
import { updateOrder } from "@/lib/actions/order.actions";
import { UpdateOrderParams } from "@/types";
import { clearCart } from "@/lib/actions/cart.actions";

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get("stripe-signature") as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event;

  try {
    event = Stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    return NextResponse.json({ message: "Webhook error", error: err });
  }

  const eventType = event.type;

  if (eventType === "checkout.session.completed") {
    const { id, metadata } = event.data.object;

    const updateOrderParams: UpdateOrderParams = {
      userId: metadata?.userId || "",
      stripeId: id,
      status: "Paid",
    };

    const updatedOrder = await updateOrder(updateOrderParams);

    console.log("useId:", metadata?.userId);

    if (metadata?.userId) {
      await clearCart(metadata?.userId);
    }

    if (updatedOrder) {
      console.log("Updated order in database", updatedOrder);
    }

    return NextResponse.json({ message: "OK", order: updatedOrder });
  }

  return new Response("", { status: 200 });
}
