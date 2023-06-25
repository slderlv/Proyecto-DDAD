/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    reactStrictMode: true,
    env: {
        MS_USERS: 'http://localhost:3000',
        MS_CITIES: 'http://localhost:3002/cities',
        MS_RESERVES: 'http://localhost:3005'
    }
}
module.exports = nextConfig
