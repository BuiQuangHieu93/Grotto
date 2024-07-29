"use client";
import { useEffect, useState } from "react";

import { useAuth } from "@clerk/nextjs";
import { CheckUserRoleById } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import MainPage from "@/components/dashboard/MainPage";

const Dashboard = () => {
  const [user, setUser] = useState(false); // Change initial state to null
  const [countdown, setCountdown] = useState(5);

  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        const userData = await CheckUserRoleById(userId);
        setUser(userData);

        if (!userData) {
          const countdownInterval = setInterval(() => {
            setCountdown((prev) => prev - 0.5);
          }, 1000);

          const redirectTimeout = setTimeout(() => {
            router.push("/home");
          }, 5000);

          return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectTimeout);
          };
        }
      }
    };

    fetchUser();
  }, [userId]); // Add userId and toastDisplayed to dependency array

  return (
    <div className="bg-[#666666]">
      {user === false ? ( // Check user directly
        <div className="w-full h-screen flex-center flex-col">
          <p className="text-4xl font-semibold p-8">You are not Admin</p>
          <p>Redirecting in {countdown} seconds...</p>
        </div>
      ) : (
        <div>
          <div className="w-full h-full">
            <MainPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
