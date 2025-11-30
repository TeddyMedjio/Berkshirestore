import { Container } from "@/components/Container";
import { Plus } from "lucide-react";
import Image from "next/image";
import productsData from "@/data.json";
import { notFound } from "next/navigation";

export default async function ProductDetail({ params }: any) {
  const { slug } = await params;

  // Récupérer le produit basé sur le slug
  const product = productsData.products.find((p) => p.slug === slug);

  // Si le produit n'existe pas, afficher la page 404
  if (!product) {
    notFound();
  }

  return (
    <section className="pt-40 relative">
      <div className="fixed bottom-0 w-full h-[52%] bg-[#F9F4F1] -z-1" />
      <Container>
        <h1 className="absolute top-0 inset-0 m-auto font-forum text-center leading-14 text-[70px] font-semibold text-blue w-[600px]">
          {product.name}
        </h1>

        <div className="flex items-start gap-10 pb-40">
          <div className="flex flex-col items-center gap-5">
            {/* Image principale (thumbnail) */}
            <Image
              src={product.thumbnail}
              height={693}
              width={520}
              alt={`picture of ${product.name}`}
            />
            {/* Galerie d'images */}
            {Array.isArray(product.images) &&
              product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  height={693}
                  width={520}
                  alt={`${product.name} - view ${index + 1}`}
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
            <div className="flex items-center justify-center opacity-50 ">
              <Image
                src={product.thumbnail}
                height={64}
                width={64}
                alt={`${product.name} thumbnail`}
              />
              {Array.isArray(product.images) &&
                product.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    height={64}
                    width={64}
                    alt={`${product.name} thumbnail ${index + 1}`}
                  />
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
