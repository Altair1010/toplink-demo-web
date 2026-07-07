"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * ImgFade — Img (next/image) + skeleton shimmer khi tải, fade-in khi ảnh load xong.
 * Dùng cho ảnh "list" hay swap (BlogIndex filter) để giảm nháy trắng.
 * Đặt trong khối cha `relative` (skeleton absolute inset-0). Tôn reduced-motion.
 */
export default function ImgFade({ src, className, ...rest }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const finalSrc = typeof src === "string" && src.startsWith("/") ? asset(src) : src;

  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 z-[1]" aria-hidden />}
      <Image
        src={finalSrc}
        onLoad={() => setLoaded(true)}
        className={cn(
          "transition-opacity duration-500 motion-reduce:transition-none",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...rest}
      />
    </>
  );
}
