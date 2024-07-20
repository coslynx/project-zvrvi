# Discord Music Bot

This project is a Discord music bot designed to enhance the social experience within Discord servers by providing a convenient and enjoyable way to listen to music with friends and fellow users. It offers features such as music playback from multiple sources (YouTube, Spotify, SoundCloud), queue management, voice channel integration, and customizable settings.

## Getting Started

### Prerequisites

* Node.js (v16+ recommended): [https://nodejs.org/](https://nodejs.org/)
* npm (Node Package Manager) or yarn (Package Manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/discord-music-bot.git
   ```

2. **Install dependencies:**
   ```bash
   cd discord-music-bot
   npm install 
   ```

3. **Create a .env file:** Create a `.env` file at the root of the project and add the following environment variables:

   ```
   DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
   YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY (optional)
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID (optional)
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET (optional)
   SOUNDCLOUD_CLIENT_ID=YOUR_SOUNDCLOUD_CLIENT_ID (optional)
   SOUNDCLOUD_CLIENT_SECRET=YOUR_SOUNDCLOUD_CLIENT_SECRET (optional)
   ```

   **Important:** Replace the placeholders with your actual API keys and tokens. You can obtain them from the respective API providers.

### Running the Bot

1. **Start the bot:**
   ```bash
   npm start
   ```

## Usage

1. **Join a voice channel** on Discord where you want to play music.
2. **Use the following commands:**

   * **`play <song name>`:** Plays the specified song from YouTube, Spotify, or SoundCloud.
   * **`pause`:** Pauses the current song.
   * **`resume`:** Resumes playback of the paused song.
   * **`stop`:** Stops the current song and clears the queue.
   * **`skip`:** Skips the current song and plays the next one in the queue.
   * **`queue`:** Displays the current music queue.
   * **`volume <number>`:** Adjusts the volume (0-100).
   * **`loop`:** Toggles looping for the current song or the entire queue.
   * **`help`:** Displays a list of available commands and their usage.
   * **`ping`:** Checks the bot's response time.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.