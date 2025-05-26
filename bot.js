const mineflayer = require('mineflayer');
const express = require('express');
const { randomAction } = require('./actions');
const config = require('./config');

function startBot() {
  const username = `${config.usernamePrefix}${Math.floor(Math.random() * 1000)}`;
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username
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

// ويب سيرفر بسيط يعرض حالة البوت
const app = express();

app.get("/", (req, res) => {
  res.send("✅ Minecraft bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server listening on port ${PORT}`);
});
