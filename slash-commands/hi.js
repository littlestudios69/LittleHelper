const {
    SlashCommand,
    CommandOptionType,
    ComponentType,
    ButtonStyle
} = require('slash-create');
const Discord = require("discord.js");


module.exports = class HelpCommand extends SlashCommand {
    constructor(creator) {
        super(creator, {
            name: 'hi',
            description: 'Hi'
        });
        this.filePath = __filename;
    }

    async run(ctx) {
        await ctx.defer();

       

        return ctx.send("Hi, Hello, End me").catch(e => console.log(e))
    }
}