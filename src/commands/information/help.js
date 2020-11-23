const config = require('./../../../config.json')
const Discord = require('discord.js');
const set = require('../../steeve')

module.exports = {
    name: 'help',
    description: 'help command',
    aliases: ['commands', '?'],
    usage: '[command name]',
    execute(message, args) {
        // console.table(commandFiles);
        const data = [];
        const {
            commands
        } = message.client;

        if (!args.length) {

            const allCommands = commands.map(command => command.name);
            const allDescriptions = commands.map(command => command.description);
            const test = commands.map(command => command.information);

            for (var i = 0; i < allCommands.length; i++) {
                data.push(`\`${allCommands[i]}\` - ${allDescriptions[i]}`);
            }
            const notes = [`* You can do \`${set.prefix}help [command name]\` to get more information on a command.`, `* This bot is still under development. If you have any issues, please report them in the support sever above.`];

            for (var i = 0; i < notes.length; i++) {
                notes.join('\n')
            }
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorMain)
                .setTitle('Help Menu')
                .addFields({
                    name: "Prefix",
                    value: `\`${set.prefix}\``
                }, {
                    name: "Commands",
                    value: `${data.join('\n')}`
                }, {
                    name: "Official Support Server",
                    value: `[https://discord.gg/jCGU9mM](https://discord.gg/jCGU9mM)`
                }, {
                    name: "Notes",
                    value: notes,
                })
                

            return message.channel.send(embed);

        }
        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorError)
                .setDescription(`That command was not found. Do \`${prefix}help\` to get a list of commands.`)
                return message.channel.send(embed);
        }
        if (command.aliases) {
            const aliasEmbed = new Discord.MessageEmbed()
                .setColor(config.embedColorMain)
                .setTitle(`Command Info for \"${command.name}\"`)
                .setDescription(command.description)
                .addFields({
                    name: 'Alias(es)',
                    value: command.aliases.join(', '),
                }, {
                    name: 'Usage',
                    value: `${prefix}${command.name} ${command.usage}`
                })
            message.channel.send(aliasEmbed);
        } else {
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorMain)
                .setTitle(`Command Info for \"${command.name}\"`)
                .setDescription(command.description)
                .addFields({
                    name: 'Usage',
                    value: `${prefix}${command.name} ${command.usage}`
                })
            message.channel.send(embed);
        }
    }
}