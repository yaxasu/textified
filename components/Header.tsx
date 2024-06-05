import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="fixed w-full h-[75px] bg-gray-900 text-white flex items-center justify-center px-20 z-30">
      <Link href='/'>
        <div className="flex items-center justify-center gap-5">
          <div className="h-[50px] w-[50px] border border-white rounded-xl relative user-select-none">
            <Image
              src="/textifiedfavicon.ico"
              alt="logo"
              layout="fill"
              className="object-cover"
            />
          </div>
          <h1 className="font-bold text-3xl">Textified</h1>
        </div>
      </Link>
    </div>
  );
};

export default Header;
