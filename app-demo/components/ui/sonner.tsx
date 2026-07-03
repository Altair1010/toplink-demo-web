"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { Toaster as Sonner, type ToasterProps } from "sonner"

// Y viện: site light-only (không next-themes). Toast nền ivory, viền crimson, bo sắc.
const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[var(--color-crimson-600)]" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4 text-[var(--color-gold-600)]" />,
        error: <OctagonXIcon className="size-4 text-[var(--color-accent-red)]" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-ivory)",
          "--normal-text": "var(--color-ink)",
          "--normal-border": "var(--color-crimson-200)",
          "--border-radius": "var(--radius-sm)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
