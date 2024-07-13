"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  return (
    <nav
      className={` top-0 w-full transition-transform duration-300 z-10 sticky ${
        visible ? "translate-y-0" : "-translate-y-full"
      } bg-gray-100`}
    >
      <div className="container p-4 flex items-center justify-between">
        <Image
          src="/image/logo.png"
          width={110}
          height={30}
          alt="logo"
          className="mr-8"
        />
        <div className="flex space-x-8 h-14 w-96 items-center">
          {["Home", "Product & collection", "Blog", "Contact"].map((item) => (
            <div
              key={item}
              className="text-gray-800 hover:text-[#a6946b] text-sm font-semibold h-full flex items-center cursor-pointer transition-colors duration-200"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex bg-white h-12 w-80 items-center rounded-lg shadow">
          <Input
            className="focus-visible:ring-transparent border-none w-[85%] ml-2"
            placeholder="Search..."
          />
          <Image src="/icon/search.svg" height={24} width={24} alt="search" />
        </div>
        <div className="flex space-x-4 focus-visible:ring-0">
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
          <Button className="bg-[#a6946b] group hover:bg-[#a6946b]">
            <Image
              src="icon/briefcase.svg"
              height={24}
              width={24}
              alt="briefcase"
              className="mr-2 group-hover:scale-110 duration-300"
            />
            <span className="font-normal"> Cart(0)</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
