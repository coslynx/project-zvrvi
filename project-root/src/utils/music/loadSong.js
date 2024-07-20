const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const SpotifyWebApi = require('spotify-web-api-node');
const SoundCloud = require('soundcloud-api');

const spotifyApi = new SpotifyWebApi({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET,
});

const soundCloudApi = new SoundCloud({
  client_id: process.env.SOUNDCLOUD_CLIENT_ID,
  client_secret: process.env.SOUNDCLOUD_CLIENT_SECRET,
});

module.exports = async (query, source) => {
  try {
    if (source === 'youtube') {
      return await loadSongFromYouTube(query);
    } else if (source === 'spotify') {
      return await loadSongFromSpotify(query);
    } else if (source === 'soundcloud') {
      return await loadSongFromSoundCloud(query);
    } else {
      throw new Error('Invalid music source provided.');
    }
  } catch (error) {
    console.error('Error loading song:', error);
    throw error;
  }
};

async function loadSongFromYouTube(query) {
  try {
    const searchResults = await ytsr(query);
    const video = searchResults.items[0];

    if (video) {
      return {
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        duration: video.duration,
        stream: ytdl(video.url, { filter: 'audioonly' }),
      };
    } else {
      throw new Error('No YouTube video found for the given query.');
    }
  } catch (error) {
    console.error('Error loading song from YouTube:', error);
    throw error;
  }
}

async function loadSongFromSpotify(query) {
  try {
    const searchResults = await spotifyApi.searchTracks(query);
    const track = searchResults.body.tracks.items[0];

    if (track) {
      return {
        title: track.name,
        url: track.external_urls.spotify,
        thumbnail: track.album.images[0].url,
        duration: track.duration_ms,
        stream: null, // Spotify streaming not supported, use external URL instead
      };
    } else {
      throw new Error('No Spotify track found for the given query.');
    }
  } catch (error) {
    console.error('Error loading song from Spotify:', error);
    throw error;
  }
}

async function loadSongFromSoundCloud(query) {
  try {
    const searchResults = await soundCloudApi.get('/tracks', {
      q: query,
      limit: 1,
    });
    const track = searchResults[0];

    if (track) {
      return {
        title: track.title,
        url: track.permalink_url,
        thumbnail: track.artwork_url,
        duration: track.duration,
        stream: null, // SoundCloud streaming not supported, use external URL instead
      };
    } else {
      throw new Error('No SoundCloud track found for the given query.');
    }
  } catch (error) {
    console.error('Error loading song from SoundCloud:', error);
    throw error;
  }
}