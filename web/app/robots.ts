import type { MetadataRoute } from "next";

import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createRobotsPolicy } from "@/lib/seo/robots";

export default function robots(): MetadataRoute.Robots {
  return createRobotsPolicy(currentPublicSiteEnvironment());
}
