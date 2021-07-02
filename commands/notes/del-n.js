const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'del-n',
    description: 'Delete a Note.',
    usage: 'del-n <note>',
    aliases: ["dn", "notes-del", "del-note"],
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
        let arr = data.user.notes
        for( var i = 0; i < arr.length; i++){ 
    
            if ( arr[i] === args.join(" ")) { 
        
                arr.splice(i, 1); 
            }
        
        }
        data.user.notes = arr
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Removed Note!')
            .setDescription(`The Note "${args.join(" ")}" has been removed successfully!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
