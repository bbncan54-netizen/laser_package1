import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/business-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/results", "/faq", "/contact"];

  return routes.map((route) => ({
    url: `${siteConfig.baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
