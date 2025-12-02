import { Metadata } from "next";
import productsData from "@/data.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productsData.products.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} - Premium Bronze Bust`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.thumbnail,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      url: `https://berkshirenerds.com/product/${product.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [product.thumbnail],
    },
    alternates: {
      canonical: `https://berkshirenerds.com/product/${product.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return productsData.products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
