"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ArrowRight, Plus, X, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SheetDemoProps {
  productToAdd?: {
    id: number;
    name: string;
    price: number;
    currency: string;
    image: string;
    slug: string;
  };
  isNavbar?: boolean;
  cartCount?: number;
}

export function SheetDemo({
  productToAdd,
  isNavbar = false,
  cartCount = 0,
}: SheetDemoProps) {
  const { items, addItem, removeItem, updateQuantity, totalItems, totalPrice } =
    useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    if (productToAdd && !isAdding) {
      setIsAdding(true);

      setTimeout(() => {
        addItem(productToAdd);
        setIsAdding(false);
      }, 800);
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isNavbar ? (
          <button className="uppercase text-[10px] md:text-[11px] cursor-pointer">
            cart ({cartCount})
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={cn(
              "text-[11px] w-full p-4 uppercase font-bold ease-in-out duration-300 cursor-pointer relative overflow-hidden",
              isAdding
                ? "text-white bg-blue cursor-not-allowed"
                : "text-blue bg-[#F1F7FD] hover:text-white hover:bg-blue"
            )}
          >
            <AnimatePresence mode="wait">
              {isAdding ? (
                <motion.span
                  key="adding"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-1"
                >
                  adding to cart
                  <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    ...
                  </motion.span>
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  add to cart
                  <Plus size={12} className="absolute inset-0 m-auto left-60" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </SheetTrigger>
      <SheetContent className="bg-[#F9F4F1] flex flex-col">
        <SheetHeader className="bg-white">
          <SheetTitle className={cn("text-2xl font-forum p-4")}>
            Shopping Cart ({totalItems})
          </SheetTitle>
        </SheetHeader>

        {/* Liste des produits dans le panier */}
        <div className="flex-1 overflow-y-auto py-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-8">
              <ShoppingCart className="size-16 text-black/20 mb-4" />
              <p className="text-sm text-black/50">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="px-8 flex gap-4 relative">
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute right-6 -top-0.5 cursor-pointer hover:bg-black/5 rounded-full p-1 transition-colors"
                >
                  <X className="text-black/50 stroke-1.5 size-3" />
                </button>
                <div className="relative h-[85px] w-[90px] overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    height={90}
                    width={85}
                    alt={item.name}
                    className="absolute inset-0 m-auto object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-[11px] uppercase font-semibold max-w-[180px]">
                      {item.name}
                    </p>
                    {/* <p className="text-[11px] text-black/60 mt-1">
                      ${item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {item.currency}
                    </p> */}
                  </div>
                  <div className="flex items-center gap-2">
                    {/* <label className="text-[10px] text-black/50">Qty:</label> */}
                    <input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 0)
                      }
                      className="border border-black/20 p-2 w-12 text-[11px] outline-0"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer avec le total */}
        <SheetFooter className="bg-[#F4F0ED] p-6 space-y-4">
          <div className="w-full">
            <p className="text-black text-sm">
              Subtotal:{" "}
              <span className="font-bold">
                $
                {totalPrice.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                USD
              </span>
            </p>
            <SheetDescription
              className={cn("text-sm text-black/50 font-light mt-2")}
            >
              Shipping & taxes calculated at checkout.
            </SheetDescription>
          </div>
          <button
            disabled={items.length === 0}
            className="text-[11px] text-white bg-blue w-full p-4 uppercase font-bold hover:text-white hover:bg-blue/90 ease-in-out duration-300 cursor-pointer flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed"
          >
            buy now
            <ArrowRight size={12} />
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
