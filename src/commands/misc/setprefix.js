const config = require('./../../../config.json')
const Discord = require('discord.js');
const set = require('../../steeve')

module.exports = {
    name: 'setprefix',
    description: 'Set Prefix (Only works twice per every 10 minutes)',
    args: true,
    aliases: ['sp'],
    usage: '<prefix>',
    async execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("You do not have permissions to change my prefix.");

        if (message.channel.type === 'dm') return;
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send("This command requires me to have \`MANAGE_CHANNELS\`");
        
        const newPrefixChannel = message.guild.channels.cache.find(ch => ch.name.startsWith(`prefix-`))
        const args1 = args[0]
        if (args1 === set.prefix) return message.channel.send("That is already the prefix.")
        const newPrefix = args[0];

            if (!newPrefixChannel) {
            const defaultChannelName = `steeve-${args1}`
            const channel = await message.guild.channels.create(defaultChannelName, {
                type: 'voice',
                permissionOverwrites: [{
                    deny: 'VIEW_CHANNEL',
                    id: message.guild.id
                }]
    
            });
            
            return message.channel.send(`My new prefix is \`${newPrefix}\`.`);
        }
        
        const channel = await message.guild.channels.cache.find(ch => ch.name.startsWith("steeve-"));
        await channel.setName(`steeve-${newPrefix}`);
        message.channel.send(`My new prefix is \`${newPrefix}\`.`);
    }
}