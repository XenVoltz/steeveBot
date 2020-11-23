const util = require('minecraft-server-util');
const Discord = require('discord.js');
const config = require('./../../../config.json');

module.exports = {
    name: 'status',
    description: 'Get the status of a server.',
    args: true,
    aliases: ['ping'],
    usage: '<server ip>',
    execute(message, args) {
        const args1 = args.slice(0).join();
        const args2 = args.slice(1).join();
        if (args2) {
            if (isNaN(args[1])) return message.channel.send("TEST");
            util.status(args1, {
                    port: args2,
                    enableSRV: true,
                    timeout: 5000,
                    protocolVersion: 47
                }) // These are the default options
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    throw error;
                });
        }
        util.status(args1)
            .then((res) => {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorMain)
                    .setTitle("Server Status")
                    .setDescription(`\`${args1}\` is **online** with **${res.onlinePlayers} / ${res.maxPlayers}** players online.`)
                    .setTimestamp()
                    .setFooter(config.botName);
                message.channel.send(embed);
            })
            .catch((error) => {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorError)
                    .setTitle("Server Status")
                    .setDescription("Server is **offline**.")
                    .setTimestamp()
                    .setFooter(config.botName);
                message.channel.send(embed);
                // throw error;
            })
    }
}