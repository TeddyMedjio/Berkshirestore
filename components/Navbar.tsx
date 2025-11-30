import Link from "next/link";
import { Container } from "./Container";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="mt-14 mb-20">
      <Container>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.png"
              height={1.75}
              width={10}
              alt="logo of warren buffet and charlie munger"
            />
            <p className="uppercase text-[11px]">Berkshire Nerds</p>
          </Link>
          <div className="space-x-5">
            <Link href="/contact" className="uppercase text-[11px]">
              contact
            </Link>
            <Link href="/contact" className="uppercase text-[11px]">
              cart (0)
            </Link>
          </div>
        </div>
      </Container>
    </nav>
  );
};
