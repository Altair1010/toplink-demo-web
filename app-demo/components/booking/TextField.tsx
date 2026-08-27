import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export function TextField({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("toplink-field", className)} {...props} />;
}
