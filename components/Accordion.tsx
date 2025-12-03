import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          WILL MY BUST GIVE ME INVESTMENT ADVICE?
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className="text-black/50">
            No, but if you press your hand to it and channel Warren and Charlie,
            the answer you are looking for may come to you.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Where do you ship to?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className="text-black/50">
            Anywhere in North America. Shipping prices vary based on location
            (the busts are rather heavy).
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>CAN I RETURN MY BUST?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className="text-black/50">
            Yes, but you will have to cover return shipping costs. All returns
            need to be made within 90 days of the order.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What is A charlie Munger?</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <p className="text-black/50">
            I'm sorry, but this site isn't for you. Please leave.
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
