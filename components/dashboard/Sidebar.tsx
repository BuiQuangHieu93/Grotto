"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/legacy/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Footer from "./Footer";

const Sidebar = () => {
  const pathname = usePathname();
  useEffect(() => {
    console.log("Current pathname:", pathname);
    sidebarLinks.forEach((item) => {
      console.log(
        "Route:",
        item.route,
        "Active:",
        pathname === item.route || pathname.startsWith(`${item.route}/`)
      );
    });
  }, [pathname]);
  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200  pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px] bg-[#cccccc]">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/image/favicon.png"
            width={24}
            height={24}
            alt="Grotto logo"
          />
          <h1 className="2xl:text-26 text-[26px] font-bold text-black-1 max-xl:hidden">
            Grotto
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route ||
            (pathname.startsWith(`${item.route}/`) &&
              item.route !== "/admin/dashboard");

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                "flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start bg-[#ffffff]",
                { "bg-bank-gradient": isActive }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  layout="fill"
                  className={cn({
                    "brightness-[3] invert-0": isActive,
                  })}
                />
              </div>
              <p
                className={cn(
                  "text-16 font-semibold text-black-2 max-xl:hidden",
                  {
                    "!text-white": isActive,
                  }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer />
    </section>
  );
};

export default Sidebar;
