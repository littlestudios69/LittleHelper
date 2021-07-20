const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'set-temperature',
    description: 'Add the temperature type (°F/°C).',
    usage: 'set-temperature <Celsius/Fahrenheit>',
    aliases: ["set-t", "temperature", "sttmp"],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "temperature")
    }else {
        if(!args[0] === "celsius" && "fahrenheit") return msg.reply("Type needs to be `celcius` or `fahrenheit`")

        data.user.temptype = args.join(" ").toLowerCase()
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
