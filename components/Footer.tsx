import Link from "next/link";
import { Container } from "./Container";
import Image from "next/image";
import BothProduct from "./BothProduct";

export const Footer = () => {
  return (
    <footer>
      <BothProduct />
      <div>
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between py-5 text-center md:text-left">
            <p className="text-black/50">
              © BerkshireNerds 2019 - A silly side project by{" "}
              <span>
                <Link href="#" className="text-blue-800 underline">
                  Tiny
                </Link>
              </span>
            </p>
            <Image src="/payment.svg" height={47} width={200} alt="logos" />
          </div>
        </Container>
      </div>
    </footer>
  );
};
