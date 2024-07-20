const { Client, Interaction } = require('discord.js');
const { loadConfig } = require('../utils/config/loadConfig');
const { getQueue } = require('../utils/music/getQueue');
const { playSong } = require('../utils/music/playSong');
const { destroyQueue } = require('../utils/music/destroyQueue');
const { createQueue } = require('../utils/music/createQueue');
const { log } = require('../utils/general/log');
const { createEmbed } = require('../utils/general/embed');

module.exports = {
  name: 'interactionCreate',
  once: false,
  execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    const config = loadConfig();
    const { commandName } = interaction;

    if (commandName === 'play') {
      const queue = getQueue(interaction.guild);
      const searchQuery = interaction.options.get('song').value;

      playSong(interaction, queue, searchQuery);
    } else if (commandName === 'pause') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is not currently playing!')],
        });
        return;
      }
      queue.player.pause();
      interaction.reply({
        embeds: [createEmbed('success', 'Paused the music!')],
      });
    } else if (commandName === 'resume') {
      const queue = getQueue(interaction.guild);
      if (queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is already playing!')],
        });
        return;
      }
      queue.player.unpause();
      interaction.reply({
        embeds: [createEmbed('success', 'Resumed the music!')],
      });
    } else if (commandName === 'stop') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is not currently playing!')],
        });
        return;
      }
      queue.player.stop();
      destroyQueue(interaction.guild);
      interaction.reply({
        embeds: [createEmbed('success', 'Stopped the music!')],
      });
    } else if (commandName === 'skip') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is not currently playing!')],
        });
        return;
      }
      queue.player.stop();
      interaction.reply({
        embeds: [createEmbed('success', 'Skipped the song!')],
      });
    } else if (commandName === 'queue') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is not currently playing!')],
        });
        return;
      }
      let queueString = 'Current Queue: \n';
      queue.tracks.forEach((track, index) => {
        queueString += `${index + 1}. ${track.title}\n`;
      });
      interaction.reply({
        embeds: [createEmbed('info', queueString)],
      });
    } else if (commandName === 'volume') {
      const queue = getQueue(interaction.guild);
      const volume = interaction.options.get('volume').value;
      if (volume < 0 || volume > 150) {
        interaction.reply({
          embeds: [createEmbed('error', 'Volume must be between 0 and 150!')],
        });
        return;
      }
      queue.player.setVolume(volume / 100);
      interaction.reply({
        embeds: [createEmbed('success', `Set volume to ${volume}%`)],
      });
    } else if (commandName === 'loop') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'The music is not currently playing!')],
        });
        return;
      }
      queue.player.setRepeatMode(
        queue.player.repeatMode === 0 ? 1 : queue.player.repeatMode === 1 ? 2 : 0
      );
      interaction.reply({
        embeds: [
          createEmbed(
            'success',
            `Loop mode is now: ${
              queue.player.repeatMode === 0
                ? 'Off'
                : queue.player.repeatMode === 1
                ? 'Song'
                : 'Queue'
            }`
          ),
        ],
      });
    } else if (commandName === 'join') {
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) {
        interaction.reply({
          embeds: [createEmbed('error', 'You must be in a voice channel!')],
        });
        return;
      }
      createQueue(interaction.guild, voiceChannel);
      interaction.reply({
        embeds: [createEmbed('success', 'Joined the voice channel!')],
      });
    } else if (commandName === 'leave') {
      const queue = getQueue(interaction.guild);
      if (!queue.playing) {
        interaction.reply({
          embeds: [createEmbed('error', 'I am not in a voice channel!')],
        });
        return;
      }
      destroyQueue(interaction.guild);
      interaction.reply({
        embeds: [createEmbed('success', 'Left the voice channel!')],
      });
    } else if (commandName === 'help') {
      let helpString = 'Available Commands: \n';
      helpString += `\t/play [song name]: Plays a song from YouTube, Spotify, or SoundCloud\n`;
      helpString += `\t/pause: Pauses the music\n`;
      helpString += `\t/resume: Resumes the music\n`;
      helpString += `\t/stop: Stops the music and clears the queue\n`;
      helpString += `\t/skip: Skips the current song\n`;
      helpString += `\t/queue: Displays the current song queue\n`;
      helpString += `\t/volume [volume]: Sets the volume between 0 and 150\n`;
      helpString += `\t/loop: Toggles the loop mode (song, queue, off)\n`;
      helpString += `\t/join: Joins the voice channel you are in\n`;
      helpString += `\t/leave: Leaves the voice channel\n`;
      helpString += `\t/help: Displays this help message\n`;
      interaction.reply({
        embeds: [createEmbed('info', helpString)],
      });
    } else if (commandName === 'ping') {
      interaction.reply({
        embeds: [createEmbed('success', `Pong! Latency: ${interaction.client.ws.ping}ms`)],
      });
    }
  },
};