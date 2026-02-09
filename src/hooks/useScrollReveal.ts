"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealDirection = "up" | "left" | "right" | "none";

interface ScrollRevealOptions {
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    direction = "up",
    delay = 0,
    duration = 0.8,
    distance = 60,
    once = true,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const from: gsap.TweenVars = { opacity: 0 };
    if (direction === "up") from.y = distance;
    if (direction === "left") from.x = -distance;
    if (direction === "right") from.x = distance;

    gsap.set(el, from);

    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [direction, delay, duration, distance, once, start]);

  return ref;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(
  speed: number = 0.2
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return ref;
}

export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  childSelector: string = ":scope > *",
  options: { stagger?: number; duration?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const { stagger = 0.1, duration = 0.7, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const children = el.querySelectorAll(childSelector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y: 40 });

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [childSelector, stagger, duration, start]);

  return ref;
}
