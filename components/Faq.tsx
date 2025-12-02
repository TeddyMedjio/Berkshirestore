"use client";

import Image from "next/image";
import { Container } from "./Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Faq = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animation progressive de la carte FAQs au scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const faqCardY = useTransform(scrollYProgress, [0, 1], [200, -100]);

  return (
    <section ref={sectionRef} className=" bg-[#F4F0ED]">
      <Container>
        <div className="relative pt-10 md:pt-40 pb-72 md:pb-60 flex items-start gap-4 md:gap-5 flex-wrap md:flex-nowrap">
          <div className="w-full md:flex-1 bg-white p-6 md:p-8">
            <h2 className="font-forum text-xl md:text-[26px] mb-4">Details</h2>
            <p className="text-sm md:text-base">
              Cast in premium Everdur bronze, with a 96% copper alloy, these 15"
              lead-free busts sit atop a further 1" deep base of Blue Fantasy
              stone to give a fitting finish to such an icon.
            </p>
          </div>
          <motion.div
            style={{ y: faqCardY }}
            className="w-full md:flex-1 bg-white p-6 md:p-8 md:mt-30"
          >
            <h2 className="font-forum text-xl md:text-[26px] mb-4">FAQs</h2>
            <p className="text-sm md:text-base">
              Cast in premium Everdur bronze, with a 96% copper alloy, these 15"
              lead-free busts sit atop a further 1" deep base of Blue Fantasy
              stone to give a fitting finish to such an icon. Cast in premium
              Everdur bronze, with a 96% copper alloy, these 15" lead-free busts
              sit atop a further 1" deep base of Blue Fantasy stone to give a
              fitting finish to such an icon.
            </p>
          </motion.div>
          <Image
            src="/images/filligram_munger.png"
            height={240}
            width={340}
            alt="Charlie Munger decorative filigree pattern"
            className="absolute bottom-0 left-0"
          />
        </div>
      </Container>
    </section>
  );
};
