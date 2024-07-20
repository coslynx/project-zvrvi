const { Queue } = require('discord-player');

module.exports = (client, guild) => {
  const queue = client.player.getQueue(guild);

  if (!queue) {
    // If no queue exists, create one
    client.player.createQueue(guild, {
      metadata: {
        channel: null,
      },
    });
  }

  return client.player.getQueue(guild);
};