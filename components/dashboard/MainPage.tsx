"use client";

import {
  calculateEarningsChange,
  calculateOrderChange,
  calculateTotalEarnings,
  getAllOrders,
} from "@/lib/actions/order.actions";
import { getAllUsers } from "@/lib/actions/user.actions";
import React, { useEffect, useState } from "react";

import {
  FaDollarSign,
  FaShoppingCart,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import DashboardCard from "./DashboardCard";
import RevenueChart from "./RevenueChart";

const Dashboard: React.FC = () => {
  const [earnings, setEarnings] = useState("0");
  const [orders, setOrders] = useState("0");
  const [customers, setCustomers] = useState("0");
  const [balance, setBalance] = useState("0");
  const [earningChange, setEarningChange] = useState(0);
  const [orderChange, setOrderChange] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const ordersData = await getAllOrders();
      const usersData = await getAllUsers();
      const earningData = await calculateTotalEarnings();
      const earningChangeData = await calculateEarningsChange();
      const orderChangeData = await calculateOrderChange();

      // Process data to get metrics
      setEarnings(earningData);
      setOrders(ordersData.length.toString());
      setCustomers(usersData.length.toString());
      setBalance("$165.89k");
      setEarningChange(earningChangeData);
      setOrderChange(orderChangeData);
    }

    fetchData();
  }, []);

  const checkEarning = () => {
    if (orderChange > 0) {
      return "increase";
    } else if (orderChange < 0) {
      return "decrease";
    } else {
      return "neutral";
    }
  };

  const checkOrder = () => {
    if (earningChange > 0) {
      return "increase";
    } else if (earningChange < 0) {
      return "decrease";
    } else {
      return "neutral";
    }
  };

  return (
    <div className="w-full p-6 bg-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        <DashboardCard
          title="Total Earnings"
          value={earnings}
          change={`${earningChange}`}
          changeType={checkEarning()}
          linkText="View net earnings"
          linkHref="#"
          icon={<FaDollarSign />}
        />
        <DashboardCard
          title="Orders"
          value={orders}
          change={`${orderChange}`}
          changeType={checkOrder()}
          linkText="View all orders"
          linkHref="#"
          icon={<FaShoppingCart />}
        />
        <DashboardCard
          title="Customers"
          value={customers}
          change="+29.08%"
          changeType="increase"
          linkText="See details"
          linkHref="#"
          icon={<FaUsers />}
        />
        <DashboardCard
          title="My Balance"
          value={balance}
          change="0.00%"
          changeType="neutral"
          linkText="Withdraw money"
          linkHref="#"
          icon={<FaWallet />}
        />
      </div>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center my-4">
          Monthly Revenue and Order Count
        </h1>
        <RevenueChart />
      </div>
    </div>
  );
};

export default Dashboard;
