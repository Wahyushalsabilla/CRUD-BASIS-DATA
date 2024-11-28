"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";

export const FloatingNav = ({
  navItems,
  className,
  username,
  cartItemCount = 0, // Optional prop to show cart item count
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
  username?: string;
  cartItemCount?: number;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(false);
        } else {
          setVisible(true);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[5000] bg-black text-white transition-all duration-300",
          className,
        )}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo Area */}
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            EstherShop
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`link=${idx}`}
                href={navItem.link}
                className="relative text-white/70 hover:text-white transition-all duration-300 group"
              >
                <span className="text-sm font-medium">
                  {navItem.name}
                  <span className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-hover:w-full transition-all duration-300"></span>
                </span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!username ? (
              <Link href={"/signin"}>
                <button className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300">
                  Sign In
                </button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href={"/profile"}>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300">
                    {username}
                  </button>
                </Link>
                <Link href={"/cart"} className="relative">
                  <ShoppingCart size={24} className="text-white/70 hover:text-white transition-colors" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black absolute top-full left-0 right-0 p-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              {navItems.map((navItem: any, idx: number) => (
                <Link
                  key={`mobile-link=${idx}`}
                  href={navItem.link}
                  className="text-white/70 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navItem.name}
                </Link>
              ))}
              {!username ? (
                <Link 
                  href={"/signin"}
                  className="text-white/70 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              ) : (
                <>
                  <Link 
                    href={"/profile"}
                    className="text-white/70 hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {username}
                  </Link>
                  <Link 
                    href={"/cart"}
                    className="text-white/70 hover:text-white flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart size={20} />
                    <span>Cart {cartItemCount > 0 ? `(${cartItemCount})` : ''}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};