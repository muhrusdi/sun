// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "Sun.js",
      meta: [
        // <meta name="description" content="My amazing site">
        { name: "description", content: "Nuxt.js boilerplate" },
      ],
      link: [
        {
          rel: "preconnect",
          href: "https://rsms.me/",
        },
        {
          rel: "stylesheet",
          href: "https://rsms.me/inter/inter.css",
        },
      ],
    },
  },
  experimental: {
    componentIslands: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["/styles/global.css"],
  runtimeConfig: {
    // Private keys are only available on the server
    apiSecret: "123",
    // Public keys that are exposed to the client
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },
  modules: ["@pinia/nuxt"],
  devtools: {
    enabled: true,
    vscode: {},
  },
});
