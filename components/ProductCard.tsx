import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  thumbnail: string;
  title: string;
  price: number;
  subtitle: string;
  slug: string;
  className?: string;
}

export const ProductCard = ({
  thumbnail,
  title,
  price,
  subtitle,
  slug,
  className = "",
}: ProductCardProps) => {
  return (
    <div className={`relative h-[500px] md:h-[650px] w-full ${className}`}>
      <Image
        src={thumbnail}
        fill={true}
        alt={`${title} in bronze`}
        className="absolute inset-0 m-auto object-cover object-center z-0"
      />
      <div className="p-6 md:p-10 absolute inset-0 m-auto bottom-0 grid place-items-end z-10 pointer-events-none">
        <div className="w-full relative pointer-events-auto">
          <p className="text-xl md:text-[26px] text-white font-forum font-semibold">
            {title}
          </p>
          <p className="text-white/80 text-[11px]">
            ${" "}
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </p>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-3 md:gap-0">
            <p className="text-white/80 text-xs md:text-[14px] flex-1 md:max-w-[300px]">
              {subtitle}
            </p>
            <Link
              href={`/product/${slug}`}
              className="bg-white p-4 md:p-5 text-[11px] uppercase font-bold text-blue flex items-center gap-1 relative z-20 w-fit"
            >
              Details
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
