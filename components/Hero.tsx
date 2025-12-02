"use client";

import { ProductCard } from "./ProductCard";
import { Container } from "./Container";
import productsData from "@/data.json";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animation du h1 au scroll
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Animation progressive de la carte Munger au scroll
  const mungerY = useTransform(scrollY, [0, 500], [-120, -200]);

  const products = productsData.products;

  return (
    <section className="pt-20 md:pt-40 relative">
      <div className="absolute bottom-0 w-full h-[70%] bg-[#F9F4F1] -z-1" />
      <Container>
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="absolute top-0 left-0 right-0 m-auto font-forum text-center leading-10 md:leading-14 text-5xl md:text-[70px] font-semibold text-blue z-10 h-fit pointer-events-none px-4"
        >
          Warren and Charlie,
          <br />
          in bronze at <br className="md:hidden" /> last
        </motion.h1>
        <div className="flex flex-col md:flex-row md:gap-5 w-full gap-10 relative z-0">
          <div className="w-full md:flex-1 relative z-0">
            <ProductCard
              thumbnail={products[0].thumbnail}
              title={products[0].title}
              price={products[0].price}
              subtitle={products[0].subtitle}
              slug={products[0].slug}
            />
          </div>
          <motion.div
            style={{ y: isMobile ? 0 : mungerY }}
            className="w-full md:flex-1 relative z-0"
          >
            <ProductCard
              thumbnail={products[1].thumbnail}
              title={products[1].title}
              price={products[1].price}
              subtitle={products[1].subtitle}
              slug={products[1].slug}
            />
          </motion.div>
        </div>

        <div className="relative grid place-items-center mt-10 lg:mt-20 pb-60">
          <p className="font-forum text-2xl text-center max-w-[550px] px-4">
            Hand-crafted in the USA, these busts are the perfect centerpiece for
            your office or gift for a fellow Berkshire groupie. <br /> <br />A
            constant reminder to channel Warren and Charlie when making any
            important investment decision.
          </p>
          <Image
            src="/images/filligram_warren.png"
            height={200}
            width={300}
            alt=""
            className="absolute bottom-0 right-0"
          />
        </div>
      </Container>
    </section>
  );
}
