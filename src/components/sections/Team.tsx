"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Section } from "@/components/ui";
import { TEAM_MEMBERS } from "@/lib/constants";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function Team() {
  return (
    <Section id="team" className="bg-primary-black-950">
      <Container>
        <div className="text-center mb-16">
          <p className="text-primary-gold font-body text-sm uppercase tracking-[0.3em] mb-2">
            Meet the Barbers
          </p>
          <h2 className="text-display-sm md:text-display-md font-heading font-bold text-white">
            Our Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <motion.div
              key={member.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-5">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="relative">
                <div className="absolute -top-[2px] left-0 w-0 h-[2px] bg-primary-gold transition-all duration-500 group-hover:w-full" />
                <h3 className="text-white font-heading text-xl font-semibold mt-1">
                  {member.name}
                </h3>
                <p className="text-primary-gold text-sm font-body uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-primary-black-300 font-body text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
