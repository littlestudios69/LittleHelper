const Discord = require('discord.js');

module.exports.mention = (message, prefix, bot) => {
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setDescription('My prefix in this guild is `' + prefix + '`.\nUse `' + prefix + 'help` to view my commands.');

    return message.channel.send({embeds: [embed]})
};

module.exports.nsfw = (message) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Not a NSFW channel')
        .setDescription('Use NSFW commands in a NSFW marked channel.')
        .setImage('https://cdn.tixte.com/uploads/cdn.lunana.xyz/kqmr2zuai9a.gif');

    return message.channel.send({embeds: [embed]})
};

module.exports.permissions = (message, cmdFile) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Access restricted')
        .setDescription('You are not allowed to use this command.\nRequired permissions: `' + cmdFile.permissions.join("`, `") + '`.');

    return message.channel.send({embeds: [embed]})
};

module.exports.botPermissions = (message, cmdFile) => {
    

    return message.channel.send('I am not allowed to use this command.\nRequired permissions: `' + cmdFile.botPermissions.join("`, `") + '`.')
};

module.exports.args = (message, arg) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Args Missing')
        .setDescription(`The Argument \`${arg}\` is a needed parameter! Please try again!`);

    return message.channel.send({embeds: [embed]})
};

module.exports.cooldown = (message, time) => {
    let embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Slow down a bit')
        .setDescription('You are using this command too frequently. Wait ' + time + ' more seconds.');

    return message.channel.send({embeds: [embed]})
};
