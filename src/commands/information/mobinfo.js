const Discord = require("discord.js");
const config = require('./../../../config.json');
const mcData = require("minecraft-data")("1.16.3")

module.exports = {
    name: 'mobinfo',
    description: `Give information on a Minecraft mob in ${mcData.version.minecraftVersion}.`,
    args: false,
    aliases: ['mi'],
    usage: '<ID of mob>',
    execute(message, args) {
        const args1 = args.slice(0);
        if (isNaN(args1)) return message.channel.send("That is not an ID.")
        const ani = mcData.mobs[`${args1}`]
        if (ani === undefined) return message.channel.send(`\`${args1}\` is not a mob found in \`${mcData.version.minecraftVersion}\`.`);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorMain)
            .setTitle("Mob Information")
            .setDescription(`Mob Name: ${ani.displayName}\nMob ID: ${ani.id}\nCategory: ${ani.category}`)
        return message.channel.send(embed);
    }
}