/* includes */
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const mongoose = require('mongoose');
const {
    SlashCreator,
    GatewayServer
} = require('slash-create');

/* defines & config */
const bot = new Discord.Client({
    intents: 32387,
    //  messageCacheLifetime: 60,
    fetchAllMembers: true,
    //  messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});
const readdir = util.promisify(fs.readdir);
let client = bot
require("./structures.js");
bot.events = new Discord.Collection();
bot.commands = new Discord.Collection();
bot.data = require('./database/MongoDB.js');
bot.logger = require('./helpers/logger.js');
bot.tools = require('./helpers/tools.js');
bot.config = require('./config.json');
const path = require('path');
async function initialize() {
    // load events
    let events = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));
    for (let e of events) {
        let eventFile = require('./events/' + e);
        let eventName = e.split('.')[0];
        bot.logger.event(eventName + ' loaded.');
        bot.on(eventName, eventFile.bind(null, bot));
    }

    // load commands
    let categories = await readdir('./commands/');
    categories.forEach(c => {
        let commands = fs.readdirSync('./commands/' + c + '/').filter(file => (file.endsWith('.js')));
        for (const file of commands) {
            let commandFile = require('./commands/' + c + '/' + file);
            bot.commands.set(commandFile.name, commandFile);
        }
        bot.logger.cmd(c + ' - ' + commands.length + ' commands loaded.');
    });

    // init database
    mongoose.connect(bot.config.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        bot.logger.log('MongoDB connected.');
    }).catch((err) => {
        bot.logger.error('MongoDB error - ' + err);
    });

    const creator = new SlashCreator({
        token: bot.config.token,
        applicationID: bot.config.appID,
        publicKey: bot.config.publicKey,
    });


    creator
        .withServer(
            new GatewayServer(
                (handler) => client.ws.on('INTERACTION_CREATE', handler)
            )
        )
        .registerCommandsIn(path.join(__dirname, 'slash-commands'))
        .syncCommands();

    creator.on('debug', m => bot.logger.debug('slash-create debug:', m))
    creator.on('warn', m => bot.logger.warn('slash-create warn:', m))
    creator.on('error', m => bot.logger.error('slash-create error:', m))
    // login bot
    bot.login(bot.config.token)
}

initialize();

