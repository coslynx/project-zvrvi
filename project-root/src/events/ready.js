const { Client, Intents } = require('discord.js');
const { loadConfig } = require('../utils/config/loadConfig');
const { log } = require('../utils/general/log');

const config = loadConfig();

module.exports = {
  onReady: async (client) => {
    log.info(`Bot is ready! Logged in as ${client.user.tag}`);

    // Set bot's presence (optional)
    client.user.setPresence({
      activities: [{ name: 'your bot's activity', type: 'PLAYING' }],
      status: 'online',
    });
  },
};