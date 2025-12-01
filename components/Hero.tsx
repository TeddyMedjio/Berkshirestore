"use client";

import { ProductCard } from "./ProductCard";
import { Container } from "./Container";
import productsData from "@/data.json";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  // Animation du h1 au scroll
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // Animation progressive de la carte Munger au scroll
  const mungerY = useTransform(scrollY, [0, 500], [-120, -200]);

  const products = productsData.products;

  return (
    <section className="pt-40 relative">
      <div className="absolute bottom-0 w-full h-[70%] bg-[#F9F4F1] -z-1" />
      <Container>
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="absolute top-0 left-0 right-0 m-auto font-forum text-center leading-14 text-[70px] font-semibold text-blue z-10 h-fit pointer-events-none"
        >
          Warren and Charlie, <br />
          in bronze at last
        </motion.h1>
        <div className="flex gap-5 flex-wrap even:pb-20">
          {products.slice(0, 2).map((product, index) => {
            if (index === 1) {
              return (
                <motion.div
                  key={product.id}
                  style={{ y: mungerY }}
                  className="flex-1 pointer-events-none"
                >
                  <div className="pointer-events-auto">
                    <ProductCard
                      thumbnail={product.thumbnail}
                      title={product.title}
                      price={product.price}
                      subtitle={product.subtitle}
                      slug={product.slug}
                    />
                  </div>
                </motion.div>
              );
            }
            return (
              <ProductCard
                key={product.id}
                thumbnail={product.thumbnail}
                title={product.title}
                price={product.price}
                subtitle={product.subtitle}
                slug={product.slug}
              />
            );
          })}
        </div>

        <div className="relative grid place-items-center mt-20 pb-30">
          <p className="font-forum text-2xl text-center max-w-[530px]">
            Hand-crafted in the USA, these busts are the perfect centerpiece for
            your office or gift for a fellow Berkshire groupie. <br /> <br />A
            constant reminder to channel Warren and Charlie when making any
            important investment decision.
          </p>
          <Image
            src="/images/filligram_warren.png"
            height={240}
            width={340}
            alt=""
            className="absolute bottom-0 right-0"
          />
        </div>
      </Container>
    </section>
  );
}
