"use client";

import { Container } from "@/components/Container";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import productsData from "@/data.json";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  useInView,
  animate,
  useScroll,
  useTransform,
} from "framer-motion";
import { SheetDemo } from "@/components/Sheet";
import { ProductStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  // Animation du h1 au scroll
  const { scrollY } = useScroll();
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  // Détecte si on est sur mobile et récupère la largeur de la fenêtre
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowWidth(window.innerWidth);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (!slug) return null;

  // Récupérer le produit basé sur le slug
  const product = productsData.products.find((p) => p.slug === slug);

  // Si le produit n'existe pas, afficher la page 404
  if (!product) {
    notFound();
  }

  // Fonction pour gérer le changement de la checkbox
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      router.push("/product/warren-buffett-and-charlie-munger");
    }
  };

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
    <>
      <ProductStructuredData
        name={product.name}
        description={product.description}
        image={product.thumbnail}
        price={product.price}
        currency={product.currency}
        sku={product.slug}
      />
      <BreadcrumbStructuredData
        items={[
          { name: "Home", url: "/" },
          { name: "Products", url: "/" },
          { name: product.name, url: `/product/${product.slug}` },
        ]}
      />
      <section className="pt-24 md:pt-40 relative">
        <div className="fixed bottom-0 w-full h-[40%] md:h-[52%] bg-[#F9F4F1] -z-1" />
        <Container>
        <motion.h1
          style={{ opacity: titleOpacity }}
          className="absolute top-12 md:top-10 inset-0 m-auto font-forum text-center text-[50px] leading-13 sm:text-4xl md:text-[55px] lg:text-[70px] font-semibold text-blue w-[90%] sm:w-[80%] md:w-[400px] lg:w-[600px] px-4"
        >
          {product.name}
        </motion.h1>

        <div className="flex flex-col md:flex-row items-start gap-5 md:gap-10 pb-20 md:pb-40">
          <div className="w-full md:w-auto">
            {/* Mobile Slider - visible uniquement sur mobile */}
            <div className="block md:hidden w-full overflow-hidden mt-40 z-0">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{
                  left:
                    windowWidth > 0
                      ? -(product.images.length - 1) * windowWidth
                      : 0,
                  right: 0,
                }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -10000) {
                    setCurrentSlide(
                      Math.min(currentSlide + 1, product.images.length - 1)
                    );
                  } else if (swipe > 10000) {
                    setCurrentSlide(Math.max(currentSlide - 1, 0));
                  }
                }}
                animate={{
                  x: windowWidth > 0 ? -currentSlide * windowWidth : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                {Array.isArray(product.images) &&
                  product.images.map((image, index) => (
                    <div
                      key={index}
                      className="shrink-0 flex items-center justify-center px-"
                      style={{
                        width: windowWidth > 0 ? `${windowWidth}px` : "100vw",
                      }}
                    >
                      <div className="relative w-full max-w-[390px] h-[520px]">
                        <Image
                          src={image}
                          fill={true}
                          alt={`${product.name} - view ${index + 1}`}
                          className="absolute inset-0 m-auto object-cover"
                        />
                      </div>
                    </div>
                  ))}
              </motion.div>

              {/* Pagination dots */}
              <div className="flex justify-center gap-2 mt-4">
                {Array.isArray(product.images) &&
                  product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index ? "bg-blue w-6" : "bg-gray-300"
                      }`}
                    />
                  ))}
              </div>
            </div>

            {/* Desktop Gallery - visible uniquement sur desktop */}
            <div className="hidden md:flex flex-col items-center gap-5">
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

            {/* Miniatures - sous la galerie (mobile uniquement) */}
            <div className="flex md:hidden flex-row gap-1 overflow-x-auto max-w-full mt-5 px-4 justify-center">
              {Array.isArray(product.images) &&
                product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative size-16 cursor-pointer flex-shrink-0"
                    onClick={() => {
                      setCurrentSlide(index);
                    }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0.5,
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
          </div>
          {/* descriptions */}
          <div className="relative md:sticky md:top-20 w-full md:max-w-[320px] space-y-5 mt-10 md:mt-20 px-4 md:px-0">
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
            {/* Miniatures (desktop uniquement) */}
            <div className="hidden md:flex flex-row gap-1 overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {Array.isArray(product.images) &&
                product.images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative size-16 cursor-pointer shrink-0"
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
            <div>
              <SheetDemo
                productToAdd={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  currency: product.currency,
                  image: product.thumbnail,
                  slug: product.slug,
                }}
              />
            </div>
            {product.slug !== "warren-buffett-and-charlie-munger" && (
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  name="reduction of 12%"
                  id=""
                  className="rounded-none"
                  onChange={handleCheckboxChange}
                />
                <p className="uppercase text-xs md:text-[11px] font-bold">
                  add{" "}
                  {product.name.toLowerCase().includes("charlie")
                    ? "warren"
                    : "charlie"}{" "}
                  for $1,00 (12% off)
                </p>
              </div>
            )}
            <Link
              href="/checkout"
              className="text-xs md:text-[11px] text-white bg-blue w-full p-4 uppercase font-bold hover:text-white hover:bg-blue ease-in-out duration-300 cursor-pointer flex items-center justify-between"
            >
              buy now
              <ArrowRight size={12} className="" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
    </>
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
    <div ref={ref} className="w-full max-w-[520px] aspect-[520/693]">
      <Image
        src={image}
        height={693}
        width={520}
        alt={`${productName} - view ${index + 1}`}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
