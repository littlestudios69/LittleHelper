const Discord = require('discord.js');

module.exports = {
    name: 'data',
    description: 'Displays you data.',
    usage: 'data',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    let user = data.user

    let embed = new Discord.MessageEmbed()
        .setTitle("Your Current Data")
        .setAuthor(msg.author.username)
        .setFooter(bot.config.credits)
        .setColor(bot.config.color)
        .setDescription(`\`\`\`json\n${JSON.stringify(user)}\`\`\``)

    return msg.channel.send({embeds: [embed]})
    }catch(err){
        bot.logger.error(err)
    }
};
