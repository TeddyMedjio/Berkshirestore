import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface infosProps {
  thumbnail: string;
  title: string;
  price: number;
  subtitle: string;
  slug: string;
}

export const ProductCard = ({
  thumbnail,
  title,
  price,
  subtitle,
  slug,
}: infosProps) => {
  return (
    <div className="relative h-[650px] flex-1 w-full">
      <Image
        src={thumbnail}
        fill={true}
        alt={`${title} in bronze`}
        className="absolute inset-0 m-auto object-cover object-center -z-1"
      />
      <div className="p-10 absolute inset-0 m-auto bottom-0 grid place-items-end">
        <div className="w-full">
          <p className="text-[26px] text-white font-forum font-semibold">
            {title}
          </p>
          <p className="text-white/80 text-[11px] ">
            ${" "}
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USD
          </p>
          <div className="flex items-center justify-between w-full">
            <p className="text-white/80 text-[14px] flex-1 max-w-[300px]">
              {subtitle}
            </p>
            <Link
              href={`/product/${slug}`}
              className="bg-white p-5 text-[11px] uppercase font-bold text-blue flex items-center gap-1"
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
