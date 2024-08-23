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
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  pt-8 text-white max-md:hidden 2xl:w-[355px] bg-[#cccccc] pl-5 overflow-hidden">
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
                "relative flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-l-full justify-center xl:justify-start bg-bank-gradient",
                {
                  "bg-[#ffffff] before:absolute before:right-0 before:w-20 before:h-20 before:translate-y-[-67px] before:shadow-[48px_48px_0_10px_white] before:rounded-full before:bg-transparent after:absolute after:right-0 after:w-20 after:h-20 after:translate-y-[67px] after:shadow-[48px_-48px_0_10px_white] after:rounded-full after:bg-transparent ":
                    isActive,
                }
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
                    "!text-[#a6946b]": isActive,
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
