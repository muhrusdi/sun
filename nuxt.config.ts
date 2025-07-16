// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
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
  },
});
