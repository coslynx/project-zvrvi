const { SlashCommandBuilder } = require('discord.js');
const { Queue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song.'),
  async execute(interaction) {
    const queue = Queue.get(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({
        content: 'There is no song currently playing.',
        ephemeral: true,
      });
    }

    try {
      await queue.setPaused(true);
      return interaction.reply({
        content: 'Paused the song.',
      });
    } catch (error) {
      console.error('Error pausing song:', error);
      return interaction.reply({
        content: 'An error occurred while pausing the song.',
        ephemeral: true,
      });
    }
  },
};