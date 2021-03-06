const Discord = require('discord.js');

module.exports = {
    name: 'botstats',
    description: 'Displays the bot stats.',
    usage: 'botstats',
    aliases: ['stats', 'info'],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setTitle(bot.user.username)
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter(bot.config.credits)
        .setColor(bot.config.color)
        .addFields(
            { name: 'Guilds', value: bot.guilds.cache.size, inline: true},
            { name: 'Users', value: bot.users.cache.size, inline: true },
            { name: 'Latency', value: bot.ws.ping + 'ms', inline: true },
            { name: 'Library', value: 'Discord.js V' + Discord.version }
        )
        .addField("Version", "at16 | Alpha Testing Commit 18");

    return msg.channel.send({embeds: [embed]})
};
