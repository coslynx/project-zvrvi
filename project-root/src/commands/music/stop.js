const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../../utils/music/getQueue');
const { destroyQueue } = require('../../utils/music/destroyQueue');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the current song and clears the queue'),
  async execute(interaction) {
    const queue = getQueue(interaction.guild);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing right now.', ephemeral: true });
    }

    try {
      await queue.stop();
      await destroyQueue(interaction.guild);
      return interaction.reply({ content: 'Stopped the music and cleared the queue.' });
    } catch (error) {
      console.error('Error stopping music:', error);
      return interaction.reply({ content: 'Something went wrong while stopping the music.', ephemeral: true });
    }
  },
};