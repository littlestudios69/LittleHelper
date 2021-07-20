const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'prior-t',
    description: 'Set the Priority of a Todo.',
    usage: 'prior-t <todo>',
    aliases: ['pt'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {
    if (!args[0]) {
        return embeds.args(msg, "todo")
    } else {
        let message = msg
        let found = false
        await data.user.todos.forEach(async (todo) => {
            if (todo.name === args.join(" ")) {
                found = true
                msg.reply("As What do you want your Todo to be marked?")
                let filter = m => m.author.id === message.author.id && m.content === "--" || m.content === "-" || m.content === "+" || m.content === "++" || m.content === ".";

        let collected = await message.channel.awaitMessages({filter, max: 1, time: 20000, errors: ['time'] });
                    todo.prior = collected.first().content.replace(" ","");
                    let arr = data.user.todos
                    for( var i = 0; i < arr.length; i++){ 
                
                        if ( arr[i].name === todo.name ){ 
                    
                            arr.splice(i, 1); 
                        }
                    
                    }
                    arr.push(todo)
                    data.user.todos = arr

                    await data.user.save()
                    msg.reply("Successfully marked the Todo as: " + collected.first().content + "!")
               
               
            }
        })
        if (!found) return msg.reply("Todo has not been found!")
        //return msg.channel.send({embeds: [embed]})
    }
}