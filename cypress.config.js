const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "aszk5d",
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
