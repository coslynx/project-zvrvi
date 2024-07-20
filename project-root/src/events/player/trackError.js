const { log } = require('../../utils/general/log');

module.exports = {
  name: 'trackError',
  once: false,
  async execute(client, queue, track, error) {
    log('error', `Player error: ${error.message}`);
    try {
      // If the error is due to the track being unavailable, skip it
      if (error.message.includes('Track is unavailable')) {
        queue.skip();
        log('info', `Skipped track due to unavailability: ${track.title}`);
        return;
      }
      // Handle other errors as needed
      // Example: If the error is due to a connection issue, try to reconnect
      // Or, if the error is due to a permissions issue, display a message to the user
      // You can also use the queue.stop() method to stop playback entirely if necessary
    } catch (err) {
      log('error', `Error handling track error: ${err.message}`);
    }
  },
};