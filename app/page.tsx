import { Faq } from "@/components/Faq";
import Hero from "@/components/Hero";
import { OrganizationStructuredData, WebsiteStructuredData } from "@/components/StructuredData";

export default function Home() {
  return (
    <>
      <OrganizationStructuredData />
      <WebsiteStructuredData />
      <main>
        <Hero />
        <Faq />
        {/* <BothProduct /> */}
      </main>
    </>
  );
}
