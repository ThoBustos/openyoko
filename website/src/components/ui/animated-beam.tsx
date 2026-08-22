import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "motion/react";

interface AnimatedBeamProps {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  delay?: number;
  duration?: number;
}

export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  delay = 0,
  duration = 4,
}: AnimatedBeamProps) {
  const id = useId();
  const [path, setPath] = useState("");
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const container = containerRef.current.getBoundingClientRect();
      const from = fromRef.current.getBoundingClientRect();
      const to = toRef.current.getBoundingClientRect();
      const startX = from.left - container.left + from.width / 2;
      const startY = from.top - container.top + from.height / 2;
      const endX = to.left - container.left + to.width / 2;
      const endY = to.top - container.top + to.height / 2;
      setSize({ width: container.width, height: container.height });
      setPath(`M ${startX},${startY} Q ${(startX + endX) / 2},${startY - curvature} ${endX},${endY}`);
    };
    const observer = new ResizeObserver(update);
    if (containerRef.current) observer.observe(containerRef.current);
    update();
    return () => observer.disconnect();
  }, [containerRef, fromRef, toRef, curvature]);

  const coordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"] };

  return (
    <svg className="animated-beam" width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`} aria-hidden="true">
      <path d={path} className="beam-track" />
      <path d={path} className="beam-active" stroke={`url(#${id})`} />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={{ ...coordinates, y1: ["0%", "0%"], y2: ["0%", "0%"] }}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity }}
        >
          <stop stopColor="#2aa65a" stopOpacity="0" />
          <stop stopColor="#2aa65a" />
          <stop offset="40%" stopColor="#fd9a4b" />
          <stop offset="100%" stopColor="#fd9a4b" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
