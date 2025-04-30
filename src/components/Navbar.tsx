// src/components/Navbar.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className="w-full bg-[#13101B] shadow-gray-400 shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Sacred Balance" width={50} height={50} />
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/african-tantric-wisdom" className="text-white hover:underline">
              African Tantric Wisdom
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center text-white hover:underline"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#13101B] shadow-sm shadow-gray-400">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/african-tantric-wisdom" onClick={handleLinkClick} className="text-white">
              African Tantric Wisdom
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
