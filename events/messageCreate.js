const Discord = require('discord.js');
const embeds = require('../helpers/embeds.js');
const cooldown = {};

module.exports = async(bot, msg) => {
    try {
        if(msg.author.bot || !msg.guild) return;
        console.log("triggered")
        let client = bot
        let guildDB = await bot.data.getGuildDB(msg.guild.id);
        let prefix = bot.config.prefix
        let argsSlice = prefix.length;
        console.log("Args Slice")
        if(!msg.content.toLowerCase().startsWith(prefix.toLowerCase())) {
            let content = msg.content.trim();
            let mention1 = '<@!' + bot.user.id + '>';
            let mention2 = '<@' + bot.user.id + '>';

            if(content == mention1 || content == mention2)
                return embeds.mention(msg, prefix, bot);

            if(content.startsWith(mention1)) argsSlice = mention1.length
            else if(content.startsWith(mention2)) argsSlice = mention2.length
            else return;
        }

        let args = msg.content.slice(argsSlice).trim().split(/ +/g);
        console.log("args")
        let command = args.shift().toLowerCase();
        console.log("cmd")
        let cmdFile = bot.commands.get(command) || bot.commands.find(cmdFile => cmdFile.aliases && cmdFile.aliases.includes(command));
console.log("triggered2")
        if(!cmdFile) return;
        let userDB = await bot.data.getUserDB(msg.author.id);
        let data = {};
        data.user = userDB;
        data.guild = guildDB;
        data.cmdFile = cmdFile;
        if(!msg.channel.nsfw && cmdFile.nsfw)
            return embeds.nsfw(msg);

        let isOwner = bot.config.owners.includes(msg.author.id);
        if(cmdFile.ownerOnly && !isOwner) return;
        if((cmdFile.permissions && !msg.member.permissions.has(cmdFile.permissions)) && !isOwner)
            return embeds.permissions(msg, cmdFile);

        if(cmdFile.botPermissions && !msg.guild.me.permissions.has(cmdFile.botPermissions) || cmdFile.botPermissions && !msg.channel.permissionsFor(client.user).has(cmdFile.botPermissions))
        return embeds.botPermissions(msg, cmdFile);

        if(!msg.channel.permissionsFor(client.user).has("SEND_MESSAGES")) return msg.reply("No Send Messages Perms")
        if(cmdFile.cooldown) {
            if(!cooldown[msg.author.id])
                cooldown[msg.author.id] = {};

            let time = cooldown[msg.author.id][cmdFile.name] || 0;
            if(time && (time > Date.now())) {
                let wait = Math.ceil((time - Date.now()) / 1000);
                return embeds.cooldown(msg, wait);
            }
            cooldown[msg.author.id][cmdFile.name] = Date.now() + cmdFile.cooldown;
        }
console.log("executing")
        cmdFile.execute(bot, msg, args, data);
    } catch(err) {
        bot.logger.error('Command execution error - ' + err);
    }
}
