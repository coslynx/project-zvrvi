const { Client, Intents } = require('discord.js');
const { createQueue, getQueue, destroyQueue } = require('../utils/music/queue');

module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  execute(oldState, newState) {
    const client = newState.client;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const member = newState.member;

    // If the member joined or left a voice channel
    if (oldChannel !== newChannel) {
      // Check if the bot is in the same channel as the member
      if (oldChannel && oldChannel.members.has(client.user.id)) {
        // If the member left the channel, check if the bot is the only one left
        if (oldChannel.members.size === 1) {
          // Destroy the queue and disconnect the bot from the channel
          destroyQueue(oldChannel.guild);
        }
      } else if (newChannel && newChannel.members.has(client.user.id)) {
        // If the member joined the channel, create a queue if one doesn't exist
        createQueue(newChannel.guild);
      }
    }

    // If the member moved between voice channels
    if (oldChannel && newChannel && oldChannel !== newChannel) {
      // Get the queue for the guild
      const queue = getQueue(member.guild);
      // If there's a queue, update the voice channel and continue playback
      if (queue) {
        queue.connection.join(newChannel);
      }
    }
  },
};