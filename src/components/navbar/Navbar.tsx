"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import LogoLightColor from "@/images/investment-x-logo-light.svg";
import NavLink from "./NavLink";
import NavbarUser from "@/components/navbar/NavbarUser";

const Navbar: React.FC = () => {
  const navItems = ["Dashboard", "Insights", "Views", "Strategies"];
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-black bg-opacity-95 border-b border-gray-700 shadow-lg">
      <div className="container flex h-16 items-center justify-between mx-auto px-6 gap-3">
        {/* Mobile Menu Button */}
        <button
          className="sm:hidden text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>

        {/* Logo */}
        <Link href="/" className="sm:hidden items-center">
          <Image
            src={LogoLightColor}
            alt="Investment-X Logo"
            className="w-auto h-auto min-w-[20px] max-w-[200px]"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="sm:flex items-center space-x-6">
        </div>

        {/* User Menu */}
        <NavbarUser />
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden bg-gray-800 text-gray-400 shadow-xl rounded-lg mt-2"
          >
            <div className="flex flex-col p-6 space-y-3">
              {navItems.map((item) => (
                <NavLink
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
