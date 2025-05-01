"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#EEECDF] shadow-gray-400 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Sacred Balance" width={50} height={50} unoptimized />
          </Link>
        </div>
      </div>
    </nav>
  );
}
