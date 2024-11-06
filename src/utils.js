const fs = require("fs");
const { LOG_FILE } = require("./config");

// Function for writing logs to a file
const log = (message) => {
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
};

// Delay function
const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

module.exports = { log, delay };
