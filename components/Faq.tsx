import Image from "next/image";
import { Container } from "./Container";

export const Faq = () => {
  return (
    <section className=" bg-[#F4F0ED]">
      <Container>
        <div className="relative pt-40 pb-60 flex items-start gap-5 flex-wrap lg:flex-nowrap">
          <div className="flex-1/2 bg-white p-8 ">
            <p className="font-forum text-[26px] mb-4">Details</p>
            <p>
              Cast in premium Everdur bronze, with a 96% copper alloy, these 15"
              lead-free busts sit atop a further 1" deep base of Blue Fantasy
              stone to give a fitting finish to such an icon.
            </p>
          </div>
          <div className="flex-1/2 bg-white p-8 lg:mt-30">
            <p className="font-forum text-[26px] mb-4">FAQs</p>
            <p>
              Cast in premium Everdur bronze, with a 96% copper alloy, these 15"
              lead-free busts sit atop a further 1" deep base of Blue Fantasy
              stone to give a fitting finish to such an icon. Cast in premium
              Everdur bronze, with a 96% copper alloy, these 15" lead-free busts
              sit atop a further 1" deep base of Blue Fantasy stone to give a
              fitting finish to such an icon.
            </p>
          </div>
          <Image
            src="/images/filligram_munger.png"
            height={240}
            width={340}
            alt=""
            className="absolute bottom-0 left-0"
          />
        </div>
      </Container>
    </section>
  );
};
