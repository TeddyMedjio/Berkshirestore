import productsData from "@/data.json";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function BothProduct() {
  const products = productsData.products;

  return (
    <section>
      {products.slice(2, 3).map((product) => (
        <div className="relative h-[554px] w-full" key={product.id}>
          <Image
            src={product.thumbnail}
            fill={true}
            alt="warren & buffet in bronz"
            className="absolute inset-0 m-auto object-cover -z-1"
          />
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center space-y-10">
              <div className="text-center">
                <p className="text-blue font-forum text-5xl font-semibold">
                  {product.title}
                </p>
                <p className="text-blsck/80 text-[11px] ">
                  ${" "}
                  {product.price.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <Link
                href={`/product/${product.slug}`}
                className="bg-blue text-white py-5 px-10 text-[11px] uppercase font-bold flex items-center gap-1"
              >
                Details
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
