"use client";

import { Container } from "@/components/Container";
import { Plus } from "lucide-react";
import Image from "next/image";
import productsData from "@/data.json";
import { notFound } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Animation du h1 au scroll
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  if (!slug) return null;

  // Récupérer le produit basé sur le slug
  const product = productsData.products.find((p) => p.slug === slug);

  // Si le produit n'existe pas, afficher la page 404
  if (!product) {
    notFound();
  }

  // Fonction pour scroller vers une image spécifique
  const scrollToImage = (index: number) => {
    const imageElement = imageRefs.current[index];
    if (imageElement) {
      // Position de la description sticky (top-20 = 5rem = 80px)
      const descriptionOffset = 80;
      const targetY =
        imageElement.getBoundingClientRect().top +
        window.scrollY -
        descriptionOffset;

      // Animation personnalisée du scroll avec framer-motion
      animate(window.scrollY, targetY, {
        duration: 1.2,
        delay: 0.1,
        ease: [0.4, 0, 0.2, 1],
        onUpdate: (latest) => {
          window.scrollTo(0, latest);
        },
      });
    }
  };

  return (
    <section className="pt-40 relative">
      <div className="fixed bottom-0 w-full h-[52%] bg-[#F9F4F1] -z-1" />
      <Container>
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="absolute top-20 inset-0 m-auto font-forum text-center leading-14 text-[70px] font-semibold text-blue w-[600px]"
        >
          {product.name}
        </motion.h1>

        <div className="flex items-start gap-10 pb-40">
          <div className="flex flex-col items-center gap-5">
            {/* Galerie d'images */}
            {Array.isArray(product.images) &&
              product.images.map((image, index) => (
                <ImageWithDetection
                  key={index}
                  image={image}
                  index={index}
                  productName={product.name}
                  onInView={() => setActiveImageIndex(index)}
                  onRefReady={(el) => {
                    imageRefs.current[index] = el;
                  }}
                />
              ))}
          </div>
          {/* descriptions */}
          <div className="sticky top-20 max-w-[320px] space-y-5 mt-20">
            <p className="text-xl text-[#3d3d3d]">
              ${" "}
              {product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {product.currency}
            </p>
            <div>
              <p className="text-sm text-[#797979] leading-7">
                {product.description}
              </p>
            </div>
            {/* Miniatures */}
            <div className="flex flex-row gap-1">
              {Array.isArray(product.images) &&
                product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative size-16 cursor-pointer"
                    onClick={() => scrollToImage(index)}
                    animate={{
                      opacity: activeImageIndex === index ? 1 : 0.5,
                    }}
                    whileHover={{
                      opacity: 1,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    transition={{
                      opacity: {
                        duration: 1.2,
                        delay: 0.15,
                        ease: [0.4, 0, 0.2, 1],
                      },
                      scale: {
                        duration: 0.2,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    }}
                  >
                    <Image
                      src={image}
                      fill={true}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="absolute inset-0 m-auto object-cover object-top"
                    />
                  </motion.div>
                ))}
            </div>
            <button className="text-blue bg-[#F1F7FD] w-full p-4 uppercase font-bold hover:text-white hover:bg-blue ease-in-out duration-300 cursor-pointer relative">
              Add to cart{" "}
              <Plus size={14} className="absolute inset-0 m-auto left-60" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Composant pour détecter quand une image est dans la vue
function ImageWithDetection({
  image,
  index,
  productName,
  onInView,
  onRefReady,
}: {
  image: string;
  index: number;
  productName: string;
  onInView: () => void;
  onRefReady: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-50% 0px -50% 0px", // Détecte quand l'image est au centre de la vue
  });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  useEffect(() => {
    onRefReady(ref.current);
  }, [onRefReady]);

  return (
    <div ref={ref}>
      <Image
        src={image}
        height={693}
        width={520}
        alt={`${productName} - view ${index + 1}`}
      />
    </div>
  );
}
