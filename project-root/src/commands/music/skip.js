const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../../utils/music/getQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.'),
  async execute(interaction) {
    const queue = getQueue(interaction);

    if (!queue) {
      return interaction.reply({ content: 'There is no song currently playing.' });
    }

    try {
      await queue.skip();
      interaction.reply({ content: 'Skipped the current song.' });
    } catch (error) {
      console.error('Error skipping song:', error);
      interaction.reply({ content: 'There was an error skipping the song.' });
    }
  },
};