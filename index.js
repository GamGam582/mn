const mineflayer = require('mineflayer');
const { randomAction } = require('./actions');
const express = require('express');
const app = express();

function startBot() {
  const bot = mineflayer.createBot({
    host: 'ol7iss.aternos.me', // تأكد من كتابة العنوان صحيح بدون صفر أو l
    port: 31911,
    username: 'Player' + Math.floor(Math.random() * 1000)
  });

  bot.on('spawn', () => {
    console.log('✅ Bot joined the server');

    setInterval(() => {
      randomAction(bot);
    }, 10000); // كل 10 ثواني يدير action
  });

  bot.on('end', () => {
    console.log('❌ Bot disconnected. Reconnecting in 10s...');
    setTimeout(startBot, 10000);
  });

  bot.on('error', err => {
    console.log('⚠️ Error:', err);
  });
}

startBot();

app.get("/", (req, res) => {
  res.send("✅ Minecraft bot is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌐 Web server is listening on port ${PORT}`);
});
