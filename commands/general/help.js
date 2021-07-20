const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
    if(args[0]){
        let cmdFile = bot.commands.get(args[0]) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(args[0]));
        let embed = new Discord.MessageEmbed()
        .setAuthor('Command list')
        .setFooter(bot.config.credits)
        .setColor(bot.config.color)
        .addField(`Name:`,`${cmdFile.name}`, true)
        .addField(`Description:`,`${cmdFile.description}`, true)
        .addField(`Usage:`,`${cmdFile.usage}`, true)
        .addField(`Aliases:`,`\`${cmdFile.aliases.join("` , `")}\``, true)
        .addField(`Needed Permissions:`,`\`${cmdFile.permissions.join("` , `")}\``, true)
        .addField(`Needed Bot Permissions:`,`\`${cmdFile.botPermissions.join("` , `")}\``, true)
        .addField(`NSFW:`,`${cmdFile.nsfw}`, true)
        .addField(`Cooldown:`,`${cmdFile.cooldown}ms`, true)
        .addField(`Owner Only:`,`${cmdFile.ownerOnly}`, true)

        .setDescription("Invite me here: https://discord.com/oauth2/authorize?client_id=860605194617225246&permissions=2214980673&scope=bot")
        .setImage("https://cdn.tixte.com/uploads/tayron.steals-code.tk/krbwq63ab9a.png");
        return msg.channel.send({embeds: [embed]})

    }else{
    let embed = new Discord.MessageEmbed()
        .setAuthor('Command list')
        .setFooter(bot.config.credits)
        .setColor(bot.config.color)
        .setDescription("Invite me here: https://discord.com/oauth2/authorize?client_id=860605194617225246&permissions=2214980673&scope=bot")
        .setImage("https://cdn.tixte.com/uploads/tayron.steals-code.tk/krbwq63ab9a.png");
    // Personally I would hardcode the help command, it gives much more flexibility than any of the automated options.

    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => file.endsWith('.js'))
        if(commands.length > 0) {
            let files = commands.map(cmd => '`' + cmd.replace('.js', '') + '`').join(', ');
            embed.addField(c.toUpperCase(), files);
        }
    });
    return msg.channel.send({embeds: [embed]})

}

}
