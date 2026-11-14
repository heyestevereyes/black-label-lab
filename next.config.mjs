import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Anchos que next/image puede generar para el srcset. Son los de Next
    // más 2560, para que las pantallas retina de 1440 a 2560 px reciban un
    // paso intermedio en vez de saltar de 2048 a 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
};

export default withNextIntl(nextConfig);
