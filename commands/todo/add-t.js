const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');
let date = new Date()

module.exports = {
    name: 'add-d',
    description: 'Add a todo.',
    usage: 'add-d <todo>',
    aliases: ["ad", "todo-add", "add-todo"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "todo")
    }else {
        data.user.todos.push({
            name: args.join(" "),
            mark: "unfinished",
            added: date.now,
            prior: "-"
        })
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Added todo!')
            .setDescription(`The todo "\`${args.join(" ")}\`" has been added successfully!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
