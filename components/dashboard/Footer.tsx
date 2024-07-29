import { SignOutButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex cursor-pointer items-center justify-between gap-2 py-6">
      <SignOutButton>
        <Button className="hover:bg-[#a6946b] group bg-[#666666]">
          <div className="mr-2">
            <Image
              src="/icon/signout.svg"
              width={36}
              height={36}
              alt="signout"
            />
          </div>
          <div className="text-black-2 group-hover:text-white"> Sign out</div>
        </Button>
      </SignOutButton>
    </footer>
  );
};

export default Footer;
