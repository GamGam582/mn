const mineflayer = require('mineflayer');
const { randomAction } = require('./actions');
const config = require('./config');

function startBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  bot.on('spawn', () => {
    console.log(`[+] Bot ${bot.username} spawned`);
    setInterval(() => randomAction(bot), config.actionDelay);
  });

  bot.on('end', () => {
    console.log('[!] Disconnected. Reconnecting in 10s...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('[x] Error:', err);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === '!jump') {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000);
    }
  });
}

startBot();
