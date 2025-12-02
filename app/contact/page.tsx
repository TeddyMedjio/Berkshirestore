import { Container } from "@/components/Container";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Berkshire Bronze Busts",
  description:
    "Get in touch with us. We usually respond within one business day.",
};

export default function ContactPage() {
  return (
    <section>
      <Container>
        <div className="text-center grid place-items-center my-20">
          <p className="text-6xl font-forum text-blue font-semibold">Contact</p>
          <p className="max-w-[400px]">
            Send us an email through the form. We usually respond within one
            business day.
          </p>
        </div>
      </Container>
      <div className="bg-[#F4F0ED] grid place-items-center py-20">
        <form className="max-w-[400px] w-[400px] space-y-1 px-5 md:px-0">
          <div className="relative w-full">
            <label
              htmlFor="email"
              className="text-[8px] absolute left-4 top-1 uppercase"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
              required
            />
          </div>
          <div className="relative w-full">
            <label
              htmlFor="name"
              className="text-[8px] absolute left-4 top-1 uppercase"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-white px-4 pt-5 pb-2 w-full outline-0 text-sm"
              required
            />
          </div>
          <div className="relative w-full">
            <label
              htmlFor="message"
              className="text-[8px] absolute left-4 top-1 uppercase"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={5}
              className="bg-white px-4 pt-5 w-full outline-0 resize-none text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="relative bg-blue w-full p-2 text-white uppercase text-[11px] font-bold cursor-pointer hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
          >
            submit
            <ArrowRight className="absolute right-4 size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
