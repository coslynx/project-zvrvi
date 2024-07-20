const { Player } = require('discord-player');

module.exports = {
  playSong: async (queue, song) => {
    try {
      if (!queue.connection) await queue.connect(queue.voiceChannel);

      queue.play(song);

      queue.node.on('trackStart', () => {
        // Log track start event
        console.log(`Now playing ${song.name} in ${queue.guild.name}`);
      });
    } catch (error) {
      // Handle playback errors
      console.error('Error playing song:', error);
      await queue.destroy();

      // Send an error message to the user
      const embed = {
        color: 0xff0000,
        description: 'An error occurred while playing the song.',
      };
      queue.textChannel.send({ embeds: [embed] });
    }
  },
};