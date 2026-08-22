import { Children, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OrbitingCirclesProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 42,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed;
  return (
    <>
      {path && <svg className="orbit-path" aria-hidden="true"><circle cx="50%" cy="50%" r={radius} /></svg>}
      {Children.map(children, (child, index) => {
        const angle = (360 / Children.count(children)) * index;
        return (
          <div
            style={{
              "--duration": `${calculatedDuration}s`,
              "--radius": `${radius}px`,
              "--angle": `${angle}deg`,
              "--angle-negative": `${-angle}deg`,
              "--icon-size": `${iconSize}px`,
            } as CSSProperties}
            className={cn("orbit-item", reverse && "orbit-reverse", className)}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
