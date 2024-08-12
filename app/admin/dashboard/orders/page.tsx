"use client";

import { getAllOrders } from "@/lib/actions/order.actions";
import { GetOrderParams } from "@/types";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrders] = useState<GetOrderParams[]>([]);

  useEffect(() => {
    const fetchOrder = async () => {
      const orders = await getAllOrders();
      setOrders(orders);
    };
    fetchOrder();
  }, []);

  return (
    <div className="p-6">
      <div className="flex-center w-full">
        <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>

            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              User ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Items
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Payment Method
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order._id}
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.userId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.product.title} (Quantity: {item.quantity}, Price:{" "}
                    {item.price})
                  </div>
                ))}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {order.totalPrice}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.paymentMethod}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
