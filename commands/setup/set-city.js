const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');

module.exports = {
    name: 'set-city',
    description: 'Add a City.',
    usage: 'set-city <city>',
    aliases: ["set-c", "city", "stst"],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    try{
    if(!args[0]){
        return embeds.args(msg, "city")
    }else {
        let notfound = false
        await require("axios").get(`http://api.weatherapi.com/v1/current.json?key=a815dcc598db4709869184846202108&q=${args.join(" ")}`)
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      notfound = true
      return msg.reply({ embeds: [
          new Discord.MessageEmbed()
          .setAuthor("City Not Found!")
          .setColor("RED")
          .setDescription("The City has not been found by our API!\nError Message: `" + error.response.data +  "`\nPlease try again later, check your Spelling, Check if the City Exists or Contact Support if this keeps happening!\n*Please be aware that City Names need to be in English to be found correctly*")
      ]
    })
      
    } else if (error.request) {
      // The request was made but no response was received
      notfound = true

      return msg.reply({embeds: [
        new Discord.MessageEmbed()
        .setAuthor("Cannot Request API")
        .setColor("RED")
        .setDescription("We are currently unable to request our API atm. Please try again later")
      ]})    } else {
      // Something happened in setting up the request that triggered an Error
      notfound = true

      return msg.reply({embeds: [
        new Discord.MessageEmbed()
        .setAuthor("Cannot Request API")
        .setColor("RED")
        .setDescription("We are currently unable to request our API atm. Please try again later")
      ]})
    }

  });
  if(notfound) return
        data.user.city = args.join(" ")
        data.user.save().then(()=>{
            let embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Updated City!')
            .setDescription(`The City has been added successfully set to "\`${args.join(" ")}\`"!`);
    
        return msg.channel.send({embeds: [embed]}) 
        })
    }
    }catch(err){
        bot.logger.error(err)
    }
};
