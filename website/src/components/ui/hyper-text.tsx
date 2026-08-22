import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  children: string;
  className?: string;
  duration?: number;
  delay?: number;
  startOnView?: boolean;
  animateOnHover?: boolean;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/<>".split("");

export function HyperText({
  children,
  className,
  duration = 700,
  delay = 0,
  startOnView = true,
  animateOnHover = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(() => children.split(""));
  const [animating, setAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!startOnView || !elementRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      window.setTimeout(() => setAnimating(true), delay);
      observer.disconnect();
    }, { threshold: 0.25 });
    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!animating || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayText(children.split(""));
      return;
    }
    let frame = 0;
    const started = performance.now();
    const animate = (time: number) => {
      const progress = Math.min((time - started) / duration, 1);
      const revealed = progress * children.length;
      setDisplayText(children.split("").map((letter, index) => letter === " " || index <= revealed ? letter : characters[Math.floor(Math.random() * characters.length)]));
      if (progress < 1) frame = requestAnimationFrame(animate);
      else setAnimating(false);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [animating, children, duration]);

  return (
    <motion.div
      ref={elementRef}
      className={cn("hyper-text", className)}
      onMouseEnter={() => { if (animateOnHover && !animating) setAnimating(true); }}
    >
      {displayText.map((letter, index) => <span key={index}>{letter}</span>)}
    </motion.div>
  );
}
