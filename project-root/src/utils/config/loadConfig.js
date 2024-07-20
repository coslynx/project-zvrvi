const fs = require('fs');

/**
 * Loads the bot's configuration from the "config.json" file.
 *
 * @returns {Object} The configuration object.
 */
const loadConfig = () => {
  try {
    const configData = fs.readFileSync('./src/config/config.json', 'utf-8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('Error loading configuration:', error);
    process.exit(1);
  }
};

module.exports = loadConfig;