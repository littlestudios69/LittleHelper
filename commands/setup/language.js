const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'set-language',
    description: 'Set a language.',
    usage: 'set-language <language>',
    aliases: ["set-l", "language", "stst"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "city")
    }else {
        data.user.city = args.join(" ")
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Updated City!')
            .setDescription(`The City has been added successfully set to "\`${args.join(" ")}\`"!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
