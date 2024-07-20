const { log } = require('../../utils/general/log');

module.exports = {
  onTrackStart: (queue, track) => {
    log.info(`[Track Start] - Track: ${track.title} - Queue: ${queue.guild.name}`);

    // Optionally, you can implement additional logic here, such as:
    // - Sending a message to the channel announcing the new track.
    // - Updating the bot's presence with the currently playing song.
    // - Fetching and displaying lyrics for the track.
  },
};