import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ActionPurpose = "back" | "advance" | "submit";
type ActionProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  purpose: ActionPurpose;
  children: ReactNode;
};

/** Native booking action with only the three product purposes this flow needs. */
export function Action({ purpose, className, children, type = "button", ...props }: ActionProps) {
  return (
    <button
      type={type}
      data-purpose={purpose}
      className={cn("toplink-action", className)}
      {...props}
    >
      {children}
    </button>
  );
}
