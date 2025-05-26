function randomAction(bot) {
  const actions = [
    () => bot.setControlState('forward', true),
    () => bot.setControlState('back', true),
    () => bot.setControlState('left', true),
    () => bot.setControlState('right', true),
    () => bot.setControlState('jump', true),
    () => {
      const yaw = Math.random() * Math.PI * 2;
      const pitch = (Math.random() - 0.5) * Math.PI;
      bot.look(yaw, pitch);
    },
    () => bot.setControlState('sprint', true)
  ];

  const stopAll = () => {
    ['forward', 'back', 'left', 'right', 'jump', 'sprint'].forEach(dir => bot.setControlState(dir, false));
  };

  stopAll();
  actions[Math.floor(Math.random() * actions.length)]();

  setTimeout(stopAll, Math.random() * 4000 + 1000);
}

module.exports = { randomAction };
