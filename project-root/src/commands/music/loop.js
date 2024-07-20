const { SlashCommandBuilder } = require('discord.js');
const { Queue } = require('discord-player');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current song or the entire queue.')
    .addStringOption(option =>
      option.setName('mode')
      .setDescription('Choose a loop mode: song or queue.')
      .setRequired(true)
      .addChoices(
        { name: 'song', value: 'song' },
        { name: 'queue', value: 'queue' }
      )
    ),
  async execute(interaction) {
    const queue = Queue.get(interaction.guildId);

    if (!queue || !queue.playing) {
      return interaction.reply({ content: 'There is no song playing right now!', ephemeral: true });
    }

    const mode = interaction.options.getString('mode');

    if (mode === 'song') {
      if (queue.repeatMode === 1) {
        queue.setRepeatMode(0);
        return interaction.reply({ content: 'Looping mode for the current song is now **off**.' });
      } else {
        queue.setRepeatMode(1);
        return interaction.reply({ content: 'Now looping the current song.' });
      }
    } else if (mode === 'queue') {
      if (queue.repeatMode === 2) {
        queue.setRepeatMode(0);
        return interaction.reply({ content: 'Looping mode for the queue is now **off**.' });
      } else {
        queue.setRepeatMode(2);
        return interaction.reply({ content: 'Now looping the entire queue.' });
      }
    }
  },
};