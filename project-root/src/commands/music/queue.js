const { SlashCommandBuilder } = require('discord.js');
const { getQueue } = require('../../utils/music/getQueue');
const { createEmbed } = require('../../utils/general/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the current music queue'),
  async execute(interaction) {
    const queue = getQueue(interaction.guild);

    if (!queue) {
      await interaction.reply({
        embeds: [createEmbed('error', `There is no queue for this server!`)],
      });
      return;
    }

    const tracks = queue.tracks.map((track, index) => `\`${index + 1}.\` **${track.title}**`);

    if (tracks.length === 0) {
      await interaction.reply({
        embeds: [createEmbed('info', `The queue is empty.`)],
      });
      return;
    }

    await interaction.reply({
      embeds: [
        createEmbed('info', `**Current Queue:**\n\n${tracks.join('\n')}`),
      ],
    });
  },
};