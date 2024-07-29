const { defineConfig } = require("Cypress");

require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      bookingAuthValue: process.env.BOOKING_AUTH_VALUE,
      bookingUsername: process.env.BOOKING_USERNAME,
      bookingPassword: process.env.BOOKING_PASSWORD 
    },
  },
});
