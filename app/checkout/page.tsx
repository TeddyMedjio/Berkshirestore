"use client";

import { Container } from "@/components/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Checkout() {
  const { items, totalPrice } = useCart();
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  // Frais de livraison (gratuit pour l'instant)
  const shippingCost = 0;
  const totalWithShipping = totalPrice + shippingCost;

  // Formater le numéro de carte (16 chiffres avec espaces)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Enlever tout sauf les chiffres
    if (value.length <= 16) {
      const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
      setCardNumber(formatted);
    }
  };

  // Formater la date d'expiration (MM/YY)
  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Enlever tout sauf les chiffres
    if (value.length <= 4) {
      let formatted = value;
      if (value.length >= 2) {
        formatted = value.slice(0, 2) + " / " + value.slice(2);
      }
      setExpirationDate(formatted);
    }
  };

  // Limiter le code de sécurité à 3 chiffres
  const handleSecurityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Enlever tout sauf les chiffres
    if (value.length <= 3) {
      setSecurityCode(value);
    }
  };
  return (
    <section className="bg-red">
      <Container>
        {/* checkout title */}
        <div className="text-center grid place-items-center mt-20 mb-10">
          <p className="text-6xl font-forum text-blue font-semibold">
            Checkout
          </p>
          <p>
            Please note, each bust is handmade to order, so please allow 2-3
            weeks for shipping.
          </p>
        </div>

        {/* Si le panier est vide */}
        {items.length === 0 ? (
          <div className="w-full grid place-items-center mb-20">
            <div className="text-center space-y-6 max-w-md">
              <p className="text-2xl font-forum text-blue font-semibold">
                Your cart is empty
              </p>
              <p className="text-black/60">
                Add some products to your cart to proceed with checkout.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-blue text-white px-8 py-3 uppercase text-[11px] font-bold hover:bg-opacity-90 transition-all duration-300"
              >
                Continue Shopping
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* formulaire */
          <div className="w-full grid place-items-center mb-10">
          <div className=" lg:max-w-[940px] lg:w-[70%] w-full flex flex-col md:flex-row items-start gap-4 ">
            <div className="w-full lg:max-w-[70%] space-y-4">
              {/* email */}
              <div className="bg-[#F9F7F6] p-5 border border-black/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[26px] font-forum font-semibold">
                    Customer Info
                  </p>
                  <p className="text-black/60">*Required</p>
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
              </div>
              {/* contact infos */}
              <div className="bg-[#F9F7F6] p-5 border border-black/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[26px] font-forum font-semibold">
                    Contact Details
                  </p>
                  <p className="text-black/60">*Required</p>
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    telephone number*
                  </label>
                  <input
                    type="tel"
                    name="tel"
                    id="tel"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
              </div>
              {/* shipping infos */}
              <div className="bg-[#F9F7F6] p-5 border border-black/10 space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[26px] font-forum font-semibold">
                    Shipping Address
                  </p>
                  <p className="text-black/60">*Required</p>
                </div>
                {/* full name */}
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    full name*
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* address */}
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    street address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* city */}
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    City*
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* province */}
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    state/province*
                  </label>
                  <input
                    type="text"
                    name="state_province"
                    id="state_province"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* zip code */}
                <div className="relative w-full">
                  <label
                    htmlFor="text"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    Zip/postal code*
                  </label>
                  <input
                    type="text"
                    name="zip_postal"
                    id="zip_postal"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* Country */}
                <div className="relative w-full">
                  <label
                    htmlFor="country"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    country*
                  </label>
                  <select
                    name="country"
                    id="country"
                    defaultValue="Canada"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  >
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
              </div>
              {/* Payment infos */}
              <div className="bg-[#F9F7F6] p-5 border border-black/10">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[26px] font-forum font-semibold">
                    Payment Method
                  </p>
                  <p className="text-black/60">*Required</p>
                </div>
                <div className="relative w-full">
                  <label
                    htmlFor="cardnumber"
                    className="text-[8px] absolute left-4 top-1 uppercase"
                  >
                    card number*
                  </label>
                  <input
                    type="text"
                    name="cardnumber"
                    id="cardnumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 1234 1234 1234"
                    className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm"
                    required
                  />
                </div>
                {/* date et cvc */}
                <div className="flex items-center space-x-2 mt-2">
                  {/* date */}
                  <div className="relative w-full">
                    <label
                      htmlFor="expirationdate"
                      className="text-[8px] absolute left-4 top-1 uppercase"
                    >
                      expiration date*
                    </label>
                    <input
                      type="text"
                      name="expirationdate"
                      id="expirationdate"
                      value={expirationDate}
                      onChange={handleExpirationChange}
                      placeholder="mm / aa"
                      className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm placeholder:uppercase"
                      required
                    />
                  </div>
                  {/* cvc */}
                  <div className="relative w-full">
                    <label
                      htmlFor="cvcnumber"
                      className="text-[8px] absolute left-4 top-1 uppercase"
                    >
                      security code*
                    </label>
                    <input
                      type="text"
                      name="cvcnumber"
                      id="cvcnumber"
                      value={securityCode}
                      onChange={handleSecurityCodeChange}
                      placeholder="cvc"
                      className="bg-white px-4 pb-2 pt-5 w-full outline-0 text-sm placeholder:uppercase"
                      required
                    />
                  </div>
                </div>
                {/* checkbox billing address */}
                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    name="billing_same_as_shipping"
                    id="billing_same_as_shipping"
                    className="rounded-none"
                    defaultChecked
                  />
                  <label
                    htmlFor="billing_same_as_shipping"
                    className=" text-sm text-black/50 "
                  >
                    Billing address same as shipping
                  </label>
                </div>
              </div>
              {/* items in Order */}
              <div className="bg-[#F9F7F6] p-5 border border-black/10">
                <p className="text-[26px] font-forum font-semibold mb-2">
                  Items in Order
                </p>

                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="relative h-[85px] w-[90px] overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          height={90}
                          width={85}
                          alt={item.name}
                          className="absolute inset-0 m-auto object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase">
                          {item.name}
                        </p>
                        <p className="text-[11px] uppercase font-semibold text-black/50">
                          quantity: {item.quantity}
                        </p>
                        <p className="text-[11px] uppercase text-black/50">
                          $ {(item.price * item.quantity).toFixed(2)} {item.currency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* order card */}
            <div className="lg:max-w-[30%] w-full space-y-2 md:sticky md:top-10">
              <div className="bg-[#F9F7F6] p-5 border border-black/10">
                <div>
                  <p className="text-[26px] font-forum font-semibold mb-3">
                    Order Summary
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Subtotal</p>
                    <p className="text-sm">${totalPrice.toFixed(2)} USD</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Fedex</p>
                    <p className="text-sm">${shippingCost.toFixed(2)} USD</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold">Total</p>
                    <p className="text-sm font-bold">${totalWithShipping.toFixed(2)} USD</p>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="relative bg-blue w-full p-2 text-white uppercase text-[11px] font-bold cursor-pointer hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center"
              >
                place order
                <ArrowRight className="absolute right-4 size-4" />
              </button>
            </div>
          </div>
        </div>
        )}
      </Container>
    </section>
  );
}
