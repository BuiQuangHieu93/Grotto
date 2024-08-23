import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { revenue } from "@/lib/actions/order.actions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface RevenueData {
  month: string;
  totalEarnings: number;
  orderCount: number;
}

const RevenueChart = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await revenue();
        setRevenueData(response);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  const chartData = {
    labels: revenueData.map((data) => data.month),
    datasets: [
      {
        label: "Total Earnings",
        data: revenueData.map((data) => data.totalEarnings),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Order Count",
        data: revenueData.map((data) => data.orderCount),
        borderColor: "rgba(153, 102, 255, 1)",
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Line data={chartData} />
    </div>
  );
};

export default RevenueChart;
