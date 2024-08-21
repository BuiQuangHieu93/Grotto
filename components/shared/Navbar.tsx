"use client";

import Image from "next/legacy/image";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Cart from "./Cart";
import { navbar } from "@/constants";
import FurnitureSearch from "./FurnitureSearch";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const { user } = useUser();

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    const isVisible = prevScrollPos > currentScrollPos || currentScrollPos < 10;

    setVisible(isVisible);
    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log(!sidebarOpen);
  };

  const handleClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-20 bg-gray-800 bg-opacity-75 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="relative w-full md:w-[50%] h-full bg-gray-100 p-4">
          <button
            className="absolute top-4 right-4 text-gray-800"
            onClick={toggleSidebar}
          >
            <FaTimes size={24} />
          </button>
          <div className="flex flex-col h-screen md:py-12 py-8">
            <div className="flex flex-col mb-4">
              {navbar.map((item) => (
                <Link
                  href={`${item.link}`}
                  key={item.title}
                  className="text-gray-800 hover:text-[#a6946b] text-lg font-semibold py-2"
                  onClick={toggleSidebar} // Close sidebar on link click
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <FurnitureSearch onClose={handleClose} />

            <div className="flex flex-col mt-4 space-y-4">
              <Select>
                <SelectTrigger className="w-full bg-gray-100 focus-visible:ring-0">
                  <SelectValue placeholder="Australia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Austria">Austria</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United States">United States</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full bg-gray-100 focus-visible:ring-0">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Deutsch">Deutsch</SelectItem>
                    <SelectItem value="Español">Español</SelectItem>
                    <SelectItem value="Italiano">Italiano</SelectItem>
                    <SelectItem value="Français">Français</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col mt-auto space-y-4">
              {user ? (
                <UserButton showName />
              ) : (
                <Link href="/sign-in">
                  <Button className="bg-gray-100 border-2 text-gray-600 group hover:bg-gray-100 w-full">
                    <Image
                      src="/icon/user.svg"
                      height={24}
                      width={24}
                      alt="user"
                      className="mr-2 group-hover:scale-110 duration-300"
                    />
                    <span className="font-normal">Log in</span>
                  </Button>
                </Link>
              )}
              <Cart />
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`top-0 w-full transition-transform duration-300 z-10 sticky ${
          visible ? "translate-y-0" : "-translate-y-full"
        } bg-gray-100`}
      >
        <div className="py-4 px-8 flex items-center justify-between">
          <Link href="/home">
            <Image
              src="/image/logo.png"
              width={110}
              height={30}
              alt="logo"
              className="mr-8"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8 h-14 w-96">
            {navbar.map((item) => (
              <Link
                href={`${item.link}`}
                key={item.title}
                className="text-gray-800 hover:text-[#a6946b] text-sm font-semibold h-full flex items-center cursor-pointer transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>

          <div className="md:flex lg:hidden flex items-center space-x-4">
            <button onClick={toggleSidebar}>
              <FaBars size={24} />
            </button>
          </div>

          {/* Desktop Search and Selects */}
          <div className="hidden lg:flex space-x-4">
            <FurnitureSearch />
            <Select>
              <SelectTrigger className="w-36 bg-gray-100 focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus-ring-0 border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Australia" />
              </SelectTrigger>
              <SelectContent className="absolute">
                <SelectGroup>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Austria">Austria</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex-center">
              <div className="w-1 h-4 bg-[#e9e8e4] "></div>
            </div>
            <Select>
              <SelectTrigger className="w-24 bg-gray-100 focus-visible:ring-0 focus-visible:border-none focus-visible:outline-none focus-ring-0 border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent className="absolute">
                <SelectGroup>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Deutsch">Deutsch</SelectItem>
                  <SelectItem value="Español">Español</SelectItem>
                  <SelectItem value="Italiano">Italiano</SelectItem>
                  <SelectItem value="Français">Français</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden lg:flex space-x-4 focus-visible:ring-0">
            {user ? (
              <div className="flex-center">
                <UserButton showName />
                <Link href="/home" />
              </div>
            ) : (
              <Link href="/sign-in">
                <Button className="bg-gray-100 border-2 text-gray-600 group hover:bg-gray-100">
                  <Image
                    src="/icon/user.svg"
                    height={24}
                    width={24}
                    alt="user"
                    className="mr-2 group-hover:scale-110 duration-300"
                  />
                  <span className="font-normal">Log in</span>
                </Button>
              </Link>
            )}
            <Cart />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
