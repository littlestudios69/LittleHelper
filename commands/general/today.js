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

module.exports.execute = async (bot, msg, args, data) => {
    if(data.user.city === undefined) return msg.reply("Please set your city with `set-city`!")
    console.log(data.user)
    require("axios")({
        url: "http://api.weatherapi.com/v1/current.json?key=a815dcc598db4709869184846202108&q=" + data.user.city,
        method: "GET"
    }).then(b => {
        console.log(b)
        console.log(b.data.current)


        let GeneralLines = ["What's cooking?", "What's up?"];

        let CurrentTime = new Date().toLocaleString("en-US", {
            timeZone: b.data.location.tz_id
        });
        let time = new Date(CurrentTime);

        let [day, month, year, hour, minute, second] = [time.getDate(), time.getMonth(), time.getFullYear(), formatNumber(time.getHours()), formatNumber(time.getMinutes()), formatNumber(time.getSeconds())];

        let ampm = "";
        if (hour > 12) ampm = "pm";
        else ampm = "am";
        let greeting = "Good Night"
        if (hour > 04) greeting = "Good Morning"
        if (hour > 12) greeting = "Good Day"
        if (hour > 18) greeting = "Good Evening"
        if (hour > 22) greeting = "Good Night"

        let hourF; if(hour < 10){hourF = "0" + hour}else{hourF = hour}
        let minuteF; if(minute < 10){minuteF = "0" + minute}else{minuteF = minute}
        let secondF; if(second < 10){secondF = "0" + second}else{secondF = second}

        hour = hour - 12;
        const embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`**${greeting}, ${msg.author}! ${GeneralLines[Math.floor(Math.random()*GeneralLines.length)]}**\n\n**Current Time:** ${month}/${day}/${year} ${hourF}:${minuteF}:${secondF}${ampm}\n**Weather:** ${b.data.current.condition.text} at ${b.data.current.temp_c}°C / ${b.data.current.temp_f}°F | Feels like: ${b.data.current.feelslike_c}°C / ${b.data.current.feelslike_f}°F.\n\n**Reminders:**\n🔹 Looks like you don't have any reminders set for today.\n\n**Todo:**\n🔹 Thing 1\n🔹 Thing 2\n🔹 Thing 3`);

        return msg.channel.send({
            embeds: [embed]
        });

    })

}

async function queryWeather(location, key) {

    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`);
    return await response.json();

}

function formatNumber(number) {
    if (number < 10) number = Number(`0${number}`);
    return number;
}