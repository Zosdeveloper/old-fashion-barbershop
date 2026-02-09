"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container, Section } from "@/components/ui";
import AmbientGlow from "@/components/effects/AmbientGlow";
import { FAQ_ITEMS } from "@/lib/constants";

function AccordionItem({
  question,
  answer,
  isOpen,
  onClick,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div className="border-b border-primary-black-800">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-white font-heading text-lg pr-4 group-hover:text-primary-gold transition-colors duration-300">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary-gold text-2xl flex-shrink-0 leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-primary-black-300 font-body text-base leading-relaxed pb-5 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" className="relative overflow-hidden">
      <AmbientGlow position="top-left" color="warm" size={0.8} intensity={0.5} />
      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
              Common Questions
            </p>
            <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white">
              FAQ
            </h2>
          </div>

          <div className="border-t border-primary-black-800">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
