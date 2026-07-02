import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FolioFrame",
    short_name: "FolioFrame",
    description:
      "Buyer-access reliability and checkout-to-customer delivery systems for digital product sellers.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8F4EC",
    theme_color: "#061B3D",
    icons: [
      {
        src: "/assets/logos/APPROVED_standalone_emblem_transparent.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
