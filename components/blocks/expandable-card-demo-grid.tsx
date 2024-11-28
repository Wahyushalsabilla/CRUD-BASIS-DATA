"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import axios from "axios";
import Link from 'next/link';

interface Product {
  description: string;
  name: string;
  price: number;
  createdAt: string;
  username: string;
}

export default function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof products)[number] | boolean | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product");
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm h-full w-full z-50"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 flex items-center justify-center z-[60]">
            <motion.button
              key={`button-${active.name}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.name}-${id}`}
              ref={ref}
              className="w-full max-w-4xl bg-white shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <motion.div layoutId={`image-${active.name}-${id}`} className="md:w-1/2 relative">
                  <Image
                    priority
                    width={600}
                    height={600}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kinder_Joy_packaging.jpg/375px-Kinder_Joy_packaging.jpg"
                    alt={active.name}
                    className="w-full h-64 md:h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <motion.h3
                    layoutId={`name-${active.name}-${id}`}
                    className="absolute bottom-4 left-4 text-3xl font-bold text-white"
                  >
                    {active.name}
                  </motion.h3>
                </motion.div>
                <div className="p-8 md:w-1/2 flex flex-col justify-between bg-white">
                  <div>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-600 mb-6 text-lg"
                    >
                      {active.description}
                    </motion.p>
                    <motion.p className="text-4xl font-bold text-black mb-8">
                      Rp. {active.price.toLocaleString()}
                    </motion.p>
                  </div>
                  <div className="space-y-4">
                    <button className="w-full bg-black text-white py-3 px-4 text-lg font-semibold hover:bg-gray-800 transition duration-300">
                      Tambah Keranjang
                    </button>
                    <Link href={`/lelang/${id}`}>
                      <button className="w-full bg-white text-black py-3 px-4 text-lg font-semibold border-2 border-black hover:bg-gray-100 transition duration-300">
                        Lelang
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-black mb-12 text-center">Produk Eksklusif</h2>
        <ul className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((card) => (
            <motion.li
              layoutId={`card-${card.name}-${id}`}
              key={card.name}
              onClick={() => setActive(card)}
              className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
            >
              <motion.div layoutId={`image-${card.name}-${id}`} className="relative">
                <Image
                  width={400}
                  height={300}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kinder_Joy_packaging.jpg/1024px-Kinder_Joy_packaging.jpg"
                  alt={card.name}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
              <div className="p-6">
                <motion.h3
                  layoutId={`name-${card.name}-${id}`}
                  className="text-xl font-bold text-black mb-2 group-hover:text-gray-700 transition-colors duration-300"
                >
                  {card.name}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-gray-600 mb-4 line-clamp-2"
                >
                  {card.description}
                </motion.p>
                <motion.p className="text-2xl font-bold text-black">
                  Rp. {card.price.toLocaleString()}
                </motion.p>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-gray-500"
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
};

