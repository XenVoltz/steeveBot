const MojangAPI = require('mojang-api');
const Discord = require('discord.js');
const config = require('./../../../config.json');

module.exports = {
    name: 'uuid',
    description: 'Give UUID of a player.',
    args: true,
    usage: '<ign>',
    execute(message, args) {

        const args1 = args.slice(0)
        MojangAPI.nameToUuid(args1, function (err, res) {
            if (err)
                console.log(err);
            else {
                // console.log(res);
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorMain)
                    .addFields({
                        name: "Player Name",
                        value: res[0].name
                    }, {
                        name: "UUID",
                        value: res[0].id
                    });

                message.channel.send(embed);
            }
        });

    }
}