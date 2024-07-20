const { DateTime } = require('luxon');

const levels = {
  info: '\x1b[32mINFO\x1b[0m',
  warn: '\x1b[33mWARN\x1b[0m',
  error: '\x1b[31mERROR\x1b[0m',
  debug: '\x1b[36mDEBUG\x1b[0m',
};

const log = (level, message) => {
  const timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
  console.log(`[${timestamp}] [${levels[level]}] ${message}`);
};

module.exports = {
  log,
  info: (message) => log('info', message),
  warn: (message) => log('warn', message),
  error: (message) => log('error', message),
  debug: (message) => log('debug', message),
};