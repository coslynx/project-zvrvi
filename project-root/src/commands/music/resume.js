const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../../utils/music/getQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resume the currently paused song.'),
  async execute(interaction) {
    const queue = getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing.', ephemeral: true });
    }

    if (!queue.player.paused) {
      return interaction.reply({ content: 'The song is already playing.', ephemeral: true });
    }

    queue.player.unpause();
    interaction.reply({ content: 'Resumed playing the song.' });
  },
};