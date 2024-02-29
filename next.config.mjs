/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.dummyjson.com', 'media.istockphoto.com', 'www.newser.com',
      'www.irishtimes.com', 'www.bright.nl', 'www.thestar.com.my',
      'upload.wikimedia.org']
  }
};

export default nextConfig;
