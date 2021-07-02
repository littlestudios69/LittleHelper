const Discord = require('discord.js');
const embeds = require('../../helpers/embeds.js');
var moment = require('moment'); // require
let date = new Date
moment().format(); 

moment.locale('en');
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'septemper', 'october', 'nevember', 'december'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    return time;
}

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
            added: (moment(date.now)),
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
