const { SlashCommandBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/general/embed');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Show a list of all commands'),
  async execute(interaction) {
    const commands = interaction.client.commands.map(command => {
      return `\`${command.data.name}\`: ${command.data.description}`;
    });

    await interaction.reply({
      embeds: [
        createEmbed('Available Commands', commands.join('\n')),
      ],
    });
  },
};