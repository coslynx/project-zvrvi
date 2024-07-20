const { Client, Intents } = require('discord.js');
const { loadConfig } = require('../utils/config/loadConfig');
const { log } = require('../utils/general/log');
const { handleCommand } = require('../commands/config/loadCommands');

module.exports = {
  onMessageCreate: async (message) => {
    const config = loadConfig();
    const prefix = config.prefix;

    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Extract command and arguments
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Find the command handler
    const command = handleCommand(commandName);

    // Execute the command handler
    if (command) {
      try {
        await command.execute(message, args);
        log(`Command executed: ${commandName}`);
      } catch (error) {
        log(`Error executing command: ${commandName}`, 'error');
        message.reply('There was an error trying to execute that command!');
      }
    }
  },
};