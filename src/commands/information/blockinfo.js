const Discord = require("discord.js");
const mcData = require("minecraft-data")("1.16.3");
const config = require('../../../config.json');

module.exports = {
    name: 'blockinfo',
    description: `Gives information on a Minecraft Block for ${mcData.version.minecraftVersion}.`,
    args: true,
    aliases: ['bi'],
    usage: '<block name>',
    execute(message, args) {
        const args1 = args.slice(0).join(" ").toLowerCase();
        if (mcData.blocksByName[args1] === undefined) {
            console.log(mcData.itemsByName[args1])
            return message.channel.send(`\`${args1}\` is not a block found in \`${mcData.version.minecraftVersion}\`.`);
        }
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorMain)
            .setTitle(`Infomation About \"${args1.toUpperCase()}\"`)
            .setDescription(`Bounding Box: ${mcData.blocksByName[args1].boundingBox}\nDiggable: ${mcData.blocksByName[args1].diggable}\nEmit Light: ${mcData.blocksByName[args1].emitLight}\nFilter Light: ${mcData.blocksByName[args1].filterLight}\nHardness: ${mcData.blocksByName[args1].hardness}\nID: ${mcData.blocksByName[args1].id}\nStack Size: ${mcData.blocksByName[args1].stackSize}\nMaterial: ${mcData.blocksByName[args1].material}`)
            .setTimestamp()
            .setFooter(config.botName);
        
        return message.channel.send(embed);
    }
}