const { Player } = require('discord-player');

module.exports = {
  destroyQueue: (queue) => {
    try {
      if (!queue) {
        return;
      }
      queue.destroy();
    } catch (error) {
      console.error('Error destroying queue:', error);
    }
  },
};