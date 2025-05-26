const mineflayer = require('mineflayer');
const express = require('express');
const { randomAction } = require('./actions');
const config = require('./config');

const app = express();

function startBot() {
  const bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  });

  bot.on('spawn', () => {
    console.log(`✅ Bot ${bot.username} joined the server`);
    setInterval(() => randomAction(bot), config.actionDelay);
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message === '!jump') {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 1000);
    }
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected. Reconnecting in 10s...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ Error:', err);
  });
}

// Start the bot
startBot();

// Set up web server
app.get("/", (req, res) => {
  res.send("✅ Minecraft bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server is listening on port ${PORT}`);
});
