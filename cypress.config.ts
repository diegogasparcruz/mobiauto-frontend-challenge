import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'https://mobiauto-frontend-challenge.vercel.app',
    viewportWidth: 1360,
    viewportHeight: 720,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
