import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-3 border border-ink px-5 py-3 font-mono text-xs uppercase tracking-[.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange disabled:pointer-events-none disabled:opacity-50", {
  variants: {
    variant: {
      default: "bg-orange text-ink hover:bg-[#ea8434] hover:text-ink",
      outline: "bg-paper text-ink hover:bg-orange",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({ className, variant, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant }), className)} {...props} />;
}
