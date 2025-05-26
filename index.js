const mineflayer = require('mineflayer');
const { randomAction } = require('./actions');

function startBot() {
  const bot = mineflayer.createBot({
    host: '0l7iss.aternos.me',
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
