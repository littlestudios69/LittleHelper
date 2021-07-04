const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');


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
        let city = ""
        if(data.user.city === undefined) city = "New York"
        else city = data.user.city
        await require("axios")({
            url: "http://api.weatherapi.com/v1/current.json?key=a815dcc598db4709869184846202108&q=" + city,
            method: "GET"
        }).then(async (b) => {
            
    
    
    
            let CurrentTime = new Date().toLocaleString("en-US", {
                timeZone: b.data.location.tz_id
            });
        data.user.todos.push({
            name: args.join(" "),
            mark: "unfinished",
            added: CurrentTime,
            prior: "-"
        })
        await data.user.save()
    })
        
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Added todo!')
            .setDescription(`The todo "\`${args.join(" ")}\`" has been added successfully!`);
    
        return msg.channel.send({embeds: [embed]}) 
        
    }
    }catch(err){
        bot.logger.error(err)
    }
};
