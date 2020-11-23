const Discord = require("discord.js");
const config = require('./../../../config.json');
const mcData = require("minecraft-data")("1.16.3")

module.exports = {
    name: 'iteminfo',
    description: `Give information on a Minecraft item for ${mcData.version.minecraftVersion}.`,
    args: true,
    aliases: ['ii'],
    usage: '<item name>',
    execute(message, args) {
        const args1 = args.slice(0).join(" ").toLowerCase();
        if (mcData.itemsByName[args1] === undefined) {
            console.log(mcData.itemsByName[args1])
            return message.channel.send(`\`${args1}\` is not an item found in \`${mcData.version.minecraftVersion}\`.`);
        }
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorMain)
            .setTitle(`Infomation About \"${args1.toUpperCase()}\"`)
            .setDescription(`ID: ${mcData.itemsByName[args1].id}\nDisplay Name: ${mcData.itemsByName[args1].displayName}\nStack Size: ${mcData.itemsByName[args1].stackSize}`)
            .setTimestamp()
            .setFooter(config.botName);

        return message.channel.send(embed);
    }
}