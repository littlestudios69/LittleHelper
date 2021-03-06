const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Displays the bot latency.',
    usage: 'ping',
    aliases: ['latency'],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setDescription('**' + bot.ws.ping + '** ms')
        .setColor(bot.config.color);

    return msg.channel.send({embeds: [embed]})
}
