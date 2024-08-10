import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/actions/order.actions";
import { CreateOrderParams } from "@/types";

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
    // const { id, amount_total, metadata, line_items } = event.data.object;
    const { id, amount_total, metadata } = event.data.object;

    // const items = line_items?.data.map((item: any) => ({
    //   product: item.description,
    //   quantity: item.quantity,
    //   price: item.amount_total / item.quantity / 100,
    // }));

    const order: CreateOrderParams = {
      stripeId: id,
      userId: metadata?.userId || "",
      // items: items || [],
      totalPrice: amount_total ? amount_total / 100 : 0,
      paymentMethod: "Stripe",
      status: "Paid",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newOrder = await createOrder(order);

    if (newOrder) {
      console.log("Create new order in database", newOrder);
    }

    return NextResponse.json({ message: "OK", order: newOrder });
  }

  return new Response("", { status: 200 });
}
