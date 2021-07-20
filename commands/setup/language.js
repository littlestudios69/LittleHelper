const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'set-language',
    description: 'Set a language.',
    usage: 'set-language <language>',
    aliases: ["set-l", "language"],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
        msg.reply("This Command does not affect anything! It does in a future Update tho i hope!")
    if(!args[0]){
        return embeds.args(msg, "language")
    }else {
        data.user.language = args.join(" ")
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Updated language!')
            .setDescription(`The Language has been added successfully set to "\`${args.join(" ")}\`"!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
