const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'show-n',
    description: 'Shows your Notes.',
    usage: 'show-n',
    aliases: ["sn", "notes-show"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
        
            let embed = new Discord.MessageEmbed()
            .setAuthor(msg.author.username, msg.author.displayAvatarURL({dynamic: true}))
            .setTitle('Here are your Notes!')
            .setDescription(data.user.notes.join("\n"))
            .setFooter(bot.config.credits)
        .setColor("GREEN")
    
        return msg.channel.send({embeds: [embed]}) 
       
    
    }catch(err){
        bot.logger.error(err)
    }
};
