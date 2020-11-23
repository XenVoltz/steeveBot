const Discord = require('discord.js');
const config = require('./../../../config.json');
const MojangAPI = require('mojang-api');

module.exports = {
    name: 'skin',
    description: 'Get the skin of a player',
    args: true,
    usage: '<ign>',
    execute(message, args) {
        const args1 = args.splice(0).join();
        MojangAPI.nameToUuid(args1, function (err, res) {
            if (err)
                console.log(err);
            else {
                const uuid = res[0].id;
                const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorMain)
                .setTitle(`${res[0].name}\'s Skin`)
                .setImage(`https://crafatar.com/renders/body/${uuid}`)
            message.channel.send(embed);
            }
        });

    }
}