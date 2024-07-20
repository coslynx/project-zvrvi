const { log } = require('../../utils/general/log');

module.exports = {
  name: 'trackEnd',
  once: false,
  async execute(client, queue) {
    log('info', `Track ended: ${queue.current.title}`);

    const playNext = () => {
      if (queue.next) {
        queue.playNext();
      } else {
        queue.destroy();
      }
    };

    if (queue.loop) {
      queue.repeat();
      playNext();
    } else {
      if (queue.autoplay) {
        const { loadSongFromYouTube } = require('../../utils/music/loadSong');
        const nextSong = await loadSongFromYouTube(queue.current.relatedVideos[0]);
        queue.add(nextSong);
        playNext();
      } else {
        playNext();
      }
    }
  },
};