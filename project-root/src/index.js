const { Client, Intents } = require('discord.js');
const { Player } = require('discord-player');
const dotenv = require('dotenv');
const loadConfig = require('./utils/config/loadConfig');
const loadCommands = require('./commands/config/loadCommands');
const log = require('./utils/general/log');

dotenv.config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });
const player = new Player(client);

const config = loadConfig();

client.on('ready', () => {
  log.info(`Bot is ready! Logged in as ${client.user.tag}`);
  loadCommands(client);
});

client.on('messageCreate', (message) => {
  // ... (message handling logic)
});

client.on('interactionCreate', (interaction) => {
  // ... (interaction handling logic)
});

client.on('voiceStateUpdate', (oldState, newState) => {
  // ... (voice state update handling logic)
});

player.on('trackStart', (track) => {
  // ... (track start handling logic)
});

player.on('trackEnd', (track) => {
  // ... (track end handling logic)
});

player.on('trackError', (track, error) => {
  // ... (track error handling logic)
});

client.login(config.token)
  .catch((error) => {
    log.error('Error logging in:', error);
  });