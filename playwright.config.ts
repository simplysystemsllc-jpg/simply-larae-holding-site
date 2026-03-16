import { defineConfig } from "@playwright/test";

const port = Number(process.env.PORT) || 3000;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  retries: 1,
  use: {
    baseURL: process.env.BASE_URL || `http://localhost:${port}`,
    headless: true,
  },
  webServer: {
    command: `pnpm --filter @workspace/simply-larae run dev`,
    port,
    reuseExistingServer: true,
    timeout: 30_000,
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
});
