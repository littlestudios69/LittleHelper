const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');
let date = new Date

module.exports = {
    name: 'todos',
    description: 'Add a todo.',
    usage: 'add-d <todo>',
    aliases: ["td", "todo-list", "todolist"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {
    try {
        let text = ``
        data.user.todos.forEach(todo => {
            let city = ""
        if(data.user.city === undefined) city = "New York"
        else city = data.user.city
        await require("axios")({
            url: "http://api.weatherapi.com/v1/current.json?key=a815dcc598db4709869184846202108&q=" + city,
            method: "GET"
        }).then(async (b) => {
            
    
    
            
            let CurrentTime = new Date(todo.added * 1000).toLocaleString("en-US", {
                timeZone: b.data.location.tz_id
            });
        
    
            text += `**${todo.name}**
                     Mark: ${todo.mark}
                     Added: ${todo.added}
                     Prior: ${todo.prior}\n\n`
                    })
        });

        let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('todos')
            .setDescription(text);

        return msg.channel.send({
            embeds: [embed]
        })
    } catch (err) {
        bot.logger.error(err)
    }
};