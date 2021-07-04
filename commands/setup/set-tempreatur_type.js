const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'set-temperature',
    description: 'Add the temperature type (°F/°C).',
    usage: 'set-temperature <Celsius/F>',
    aliases: ["set-t", "temperature", "sttmp"],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    console.log("1")
    try{
    if(!args[0]){
        return embeds.args(msg, "temperature")
        console.log("2")
    }else {
        console.log("3")
        if(!args[0] === "celsius" && "fahrenheit") return
        console.log("4")

        data.user.temptype = args.join(" ")
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Updated temperature type!')
            .setDescription(`Temperature type has been added successfully set to "\`${args.join(" ")}\`"!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
