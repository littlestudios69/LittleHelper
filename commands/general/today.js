const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'today',
    description: 'Grab general information about weather and reminders.',
    usage: 'today',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {

    console.log(data.user)

    let TimeSpecificLines = ["Good morning", "Good afternoon", "Good evening"];
    let GeneralLines = ["What's cooking", "What's up"];

    let CurrentTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
    let time = new Date(CurrentTime);

    let [day, month, year, hour, minute, second] = [time.getDate(), time.getMonth(), time.getFullYear(), formatNumber(time.getHours()), formatNumber(time.getMinutes()), formatNumber(time.getSeconds())];
    
    let ampm = "";
    if (hour > 12) ampm = "pm";
    else ampm = "am";

    hour = hour - 12;
    const embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setAuthor(msg.author.username, msg.author.displayAvatarURL())
        .setTitle(`Today's Information`)
        .setDescription(`**Current Time:** ${month}/${day}/${year} ${hour}:${minute}:${second}${ampm}\n**Weather:** No data found for your area.\n\n**Reminders:**\n🔹 Looks like you don't have any reminders set for today.\n\n**Todo:**\n🔹 Thing 1\n🔹 Thing 2\n🔹 Thing 3`);

    return msg.channel.send({ embeds: [embed] });
    
    
    
}

async function queryWeather(location, key) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`);
    return await response.json();
    
}

function formatNumber(number) {
    if (number < 10) number = Number(`0${number}`);
    return number;
}