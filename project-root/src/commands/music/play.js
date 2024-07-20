const { Client, MessageEmbed } = require("discord.js");
const {  ytdl } = require("ytdl-core");
const {  Player } = require("discord-player");
const {  ytsr } = require("ytsr");
const {  default: spotify } = require("spotify-web-api-node");
const {  default: soundcloud } = require("soundcloud-api");
const {  getQueue, createQueue, addToQueue, playSong } = require("../../utils/music");
const {  log } = require("../../utils/general");
const {  createEmbed } = require("../../utils/general");
const {  loadSongFromYouTube, loadSongFromSpotify, loadSongFromSoundCloud } = require("../../utils/music");
require('dotenv').config();

module.exports = {
  name: "play",
  description: "Plays a song from YouTube, Spotify, or SoundCloud.",
  options: [
    {
      name: "query",
      description: "The song to play",
      type: "STRING",
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const query = interaction.options.getString("query");
    const voiceChannel = interaction.member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({
        embeds: [createEmbed("error", "You must be in a voice channel to use this command.")],
      });
    }

    const queue = getQueue(interaction.guild);

    try {
      let song;

      // Search for song on YouTube
      if (query.startsWith("https://www.youtube.com/") || query.startsWith("https://youtu.be/")) {
        song = await loadSongFromYouTube(query);
      } else if (query.startsWith("https://open.spotify.com/")) {
        song = await loadSongFromSpotify(query);
      } else if (query.startsWith("https://soundcloud.com/")) {
        song = await loadSongFromSoundCloud(query);
      } else {
        const searchResults = await ytsr(query);
        song = await loadSongFromYouTube(searchResults.items[0].url);
      }

      if (song) {
        await interaction.reply({
          embeds: [createEmbed("info", `Adding **${song.name}** to the queue!`)],
        });
        addToQueue(queue, song);

        // If queue is empty, start playing
        if (!queue.playing) {
          playSong(queue, song);
        }
      } else {
        interaction.reply({
          embeds: [createEmbed("error", "No song found with that query.")],
        });
      }
    } catch (error) {
      log("error", `Error playing song: ${error.message}`);
      interaction.reply({
        embeds: [createEmbed("error", "An error occurred while playing the song.")],
      });
    }
  },
};