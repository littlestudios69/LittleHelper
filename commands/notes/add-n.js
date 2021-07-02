const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'add-n',
    description: 'Add a Note.',
    usage: 'add-n <note>',
    aliases: ["an", "notes-add", "add-note"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "Note")
    }else {
        data.user.notes.push(args.join(" "))
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Added Note!')
            .setDescription(`The Note "\`${args.join(" ")}\`" has been added successfully!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
