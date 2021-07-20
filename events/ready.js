module.exports = async (bot) => {
  try {
    let client = bot
    let items = [
      "with your Todos!",
      "with beans!",
      "with your Notes!",
      "with the Weather!",
      "with yo mama",
      "with you",
      "with the knife in the backyard"
    ]
    setInterval(function(){
    
    var item = items[Math.floor(Math.random()*items.length)];
     client.user.setPresence({ activities: [{ name: `${item} | h!help | V: at18` }] });
  }, 20000)
  var item = items[Math.floor(Math.random()*items.length)];
  client.user.setPresence({ activities: [{ name: `${item} | h!help | V: at18` }] });
    bot.logger.ready(bot.user.tag + ' initialized.');
  } catch (err) {
    bot.logger.error('Ready event error - ' + err);
  }
};