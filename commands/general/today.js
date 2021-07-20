const Discord = require('discord.js');
const fetch = require("node-fetch");

module.exports = {
    name: 'today',
    description: 'Grab general information about weather and reminders.',
    usage: 'today',
    aliases: [],
    permissions: [],
    botPermissions: ["EMBED_LINKS", "SEND_MESSAGES","READ_MESSAGE_HISTORY","ATTACH_FILES"],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async (bot, msg, args, data) => {

    if (data.user.city === undefined) {
        msg.reply("Please set your city with `set-city`!")
        return
    }
    require("axios")({
        url: "http://api.weatherapi.com/v1/current.json?key=a815dcc598db4709869184846202108&q=" + data.user.city,
        method: "GET"
    }).then(b => {
        let GeneralLines = ["What's cooking?", "What's up?"];
        let localestrings = {
            "Saudi Arabia": "ar-SA",
            "Bangladesh": "bn-BD",
            "India": "bn-IN",
            "Czech Republic": "cs-CZ",
            "Denmark": "da-DK",
            "Austria": "de-AT",
            "Switzerland": "de-CH",
            "Germany": "de-DE",
            "Greece": "el-GR",
            "Australia": "en-AU",
            "Canada": "en-CA",
            "United Kingdom": "en-GB",
            "Ireland": "en-IE",
            "United States of America": "en-US",
            "Spain": "es-es",
            "Finnland": "fi-FI",
            "France": "fr-FR",
            "Israel": "he-IL",
            "Hungary": "hu-HU",
            "Indonesia": "id-ID",
            "Japan": "ja-JP",
            "South Korea": "ko-KR",
            "Belgium": "nl-BE",
            "Netherlands": "nl-NL",
            "Norway": "no-NO",
            "Poland": "pl-PL",
            "Brazil": "pt-BR",
            "Portugal": "pt-PT",
            "Romania": "ro-RO ",
            "Russia": "ru-RU",
            "Slovakia": "sk-SK",
            "Sweden": "sv-SE",
            "Thailand": "th-TH",
            "Turkey": "tr-TR",
            "Hong Kong": "zh-HK",
            "Mainland China": "zh-CN",
            "Taiwan": "zh-TW"
        }
        let CurrentTime = new Date().toLocaleString(localestrings[b.data.location.country], {
            timeZone: b.data.location.tz_id
        });

        let time = new Date(CurrentTime);

        let [day, month, year, hour, minute, second] = [time.getDate(), time.getMonth(), time.getFullYear(), formatNumber(time.getHours()), formatNumber(time.getMinutes()), formatNumber(time.getSeconds())];

        let greeting = "Good Night"
        if (hour > 04) greeting = "Good Morning"
        if (hour > 12) greeting = "Good Day"
        if (hour > 18) greeting = "Good Evening"
        if (hour > 22) greeting = "Good Night"

        let hourF;
        if (hour < 10) {
            hourF = "0" + hour
        } else {
            hourF = hour
        }
        let minuteF;
        if (minute < 10) {
            minuteF = "0" + minute
        } else {
            minuteF = minute
        }
        let secondF;
        if (second < 10) {
            secondF = "0" + second
        } else {
            secondF = second
        }


        let todos = ""
        let tomuch = false
        if (data.user.todos.length > 10) tomuch = true

        let num = 0
        data.user.todos.forEach(async (todo) => {
            if (num > 9) return
            num++
            todos += `:small_blue_diamond: **${todo.name}** - ${todo.mark.toLocaleUpperCase()}\n`
        })
        if (tomuch) todos += `:small_blue_diamond: *and ${data.user.todos.length - 10} more*`
        if (data.user.todos.length === 0) todos = ":small_blue_diamond: Looks like you have done everything that you wanted todo!"

        let notes = ""
        let tomuch2 = false
        if (data.user.notes.length > 10) tomuch = true

        let num2= 0
        data.user.notes.forEach(async (todo) => {
            if (num2 > 9) return
            num2++
            notes += `:small_blue_diamond: **${todo}**\n`
        })
        if (tomuch) notes += `:small_blue_diamond: *and ${data.user.notes.length - 10} more*`
        if (data.user.notes.length === 0) notes = ":small_blue_diamond: Looks like you have no notes!"

        let feelslike = ""
        let temp = ""
        if (data.user.temptype === "celsius") {
            feelslike = b.data.current.feelslike_c + "°C"
            temp = b.data.current.temp_c + "°C"
        } else {
            feelslike = b.data.current.feelslike_f + "°F"
            temp = b.data.current.temp_f + "°F"
        }

        hour = hour - 12;
        const embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setDescription(`**${greeting}, ${msg.author}! ${GeneralLines[Math.floor(Math.random()*GeneralLines.length)]}**\n\n**Current Time:** ${CurrentTime}\n**Weather in ${data.user.city}:** ${b.data.current.condition.text} at ${temp} | Feels like: ${feelslike}.\n\|\|last updated at: ${b.data.current.last_updated}\|\|\n\n**Notes:**\n${notes}\n\n**Todo:**\n${todos}`);

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