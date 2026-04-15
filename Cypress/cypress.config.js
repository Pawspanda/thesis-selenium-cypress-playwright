const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://practice.expandtesting.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
  },
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'report/json',
    overwrite: false,
    html: false,
    json: true
  }
});