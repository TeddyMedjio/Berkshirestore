"use client";

import Link from "next/link";
import { Container } from "./Container";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { SheetDemo } from "./Sheet";

export const Navbar = () => {
  const { totalItems } = useCart();

  return (
    <nav className="mt-6 mb-20">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              height={35}
              width={150}
              alt="logo of Warren Buffett and Charlie Munger"
            />
            {/* <p className="uppercase text-[10px] md:text-[11px]">
              Berkshire Nerds
            </p> */}
          </Link>
          <div className="flex items-center space-x-3 md:space-x-5">
            <Link
              href="/contact"
              className="uppercase text-[10px] md:text-[11px]"
            >
              contact
            </Link>
            <SheetDemo isNavbar={true} cartCount={totalItems} />
          </div>
        </div>
      </Container>
    </nav>
  );
};
