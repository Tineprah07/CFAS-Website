/** @type {import('next').NextConfig} */
const nextConfig = {
  // Let phones and other devices on the local network load the dev server's
  // scripts (e.g. http://192.168.0.149:3000). Without this the page renders
  // but nothing interactive works. Development only.
  allowedDevOrigins: ["192.168.*.*"],
};

export default nextConfig;
