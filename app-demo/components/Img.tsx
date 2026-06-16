import Image, { type ImageProps } from "next/image";
import { asset } from "@/lib/asset";

/**
 * Wrapper quanh next/image: tự thêm basePath cho ảnh /public.
 * (next/image với images.unoptimized + basePath KHÔNG tự prefix src.)
 */
export default function Img({ src, ...rest }: ImageProps) {
  const finalSrc = typeof src === "string" && src.startsWith("/") ? asset(src) : src;
  return <Image src={finalSrc} {...rest} />;
}
