const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["tesseract.js"],
        outputFileTracingIncludes: {
            "/api/**/*": [
                "./node_modules/**/*.wasm",
                "./node_modules/**/*.proto",
            ],
        },
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "storage.cloud.google.com",
            },
        ],
    },
};
export default nextConfig;
