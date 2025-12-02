import Script from "next/script";

interface ProductStructuredDataProps {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  sku: string;
  brand?: string;
}

export function ProductStructuredData({
  name,
  description,
  image,
  price,
  currency,
  sku,
  brand = "Berkshire Nerds",
}: ProductStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: `https://berkshirenerds.com${image}`,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: `https://berkshirenerds.com/product/${sku}`,
      priceCurrency: currency,
      price: price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Berkshire Nerds",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "1",
    },
  };

  return (
    <Script
      id={`product-${sku}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Berkshire Nerds",
    url: "https://berkshirenerds.com",
    logo: "https://berkshirenerds.com/logo.png",
    description:
      "Premium hand-crafted bronze busts of Warren Buffett and Charlie Munger, cast in Everdur bronze with Blue Fantasy stone base.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: "English",
    },
    sameAs: [
      // Add your social media profiles here
      // "https://twitter.com/berkshirenerds",
      // "https://facebook.com/berkshirenerds",
    ],
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Berkshire Nerds",
    url: "https://berkshirenerds.com",
    description:
      "Premium hand-crafted bronze busts of Warren Buffett and Charlie Munger",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://berkshirenerds.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://berkshirenerds.com${item.url}`,
    })),
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
