import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  pauseOnHover = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div className={cn("marquee", pauseOnHover && "marquee-pause", className)} {...props}>
      {Array.from({ length: repeat }).map((_, index) => (
        <div className="marquee-group" aria-hidden={index > 0} key={index}>
          {children}
        </div>
      ))}
    </div>
  );
}
