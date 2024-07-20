const { Queue } = require('discord-player');

module.exports = {
  createQueue: (client, guild) => {
    const queue = new Queue(client, {
      metadata: {
        channel: null, // Set the channel where the music is playing
        guild: guild, // Set the guild (Discord server) of the queue
        volume: 100, // Set the default volume
        loop: false, // Set the default loop mode
      },
    });

    // Handle queue events
    queue.on('trackStart', (track) => {
      // Handle track start event (e.g., log the track name)
      console.log(`Playing track: ${track.title}`);
    });

    queue.on('trackEnd', (track) => {
      // Handle track end event (e.g., play next track in the queue)
      // console.log(`Track ended: ${track.title}`);
    });

    queue.on('error', (error) => {
      // Handle playback errors
      console.error(`Playback error: ${error.message}`);
    });

    // Store the queue for future access
    client.queues.set(guild.id, queue);
    return queue;
  },
};