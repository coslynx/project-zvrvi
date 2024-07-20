const { SlashCommandBuilder } = require('discord.js');
const { Queue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Adjusts the volume of the music player.')
    .addNumberOption(option =>
      option.setName('volume')
        .setDescription('The new volume (0 - 100)')
        .setRequired(true)
    ),
  async execute(interaction) {
    const volume = interaction.options.getNumber('volume');

    if (volume < 0 || volume > 100) {
      return interaction.reply({ content: 'Please enter a volume between 0 and 100.', ephemeral: true });
    }

    const queue = Queue.get(interaction.guildId);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing in this server.', ephemeral: true });
    }

    queue.setVolume(volume / 100);

    interaction.reply({ content: `Volume set to **${volume}%**` });
  },
};