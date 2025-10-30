const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "nbpeeu",
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  }
}); 
