const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'del-t',
    description: 'Delete a todo.',
    usage: 'del-n <note>',
    aliases: ["dt", "todos-del", "del-todo"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "Todo")
    }else {
        let arr = data.user.todos
        for( var i = 0; i < arr.length; i++){ 
    
            if ( arr[i].name === args.join(" ")) { 
        
                arr.splice(i, 1); 
            }
        
        }
        data.user.todos = arr
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Removed todo!')
            .setDescription(`The todo "${args.join(" ")}" has been removed successfully!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
