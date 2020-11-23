const MojangAPI = require('mojang-api');
const Discord = require('discord.js');
const config = require('../../../config.json');

module.exports = {
    name: 'ign',
    description: 'Get in-game name from UUID.',
    args: true,
    usage: '<uuid>',
    execute(message, args) {
        args1 = args.slice(0).join();

        MojangAPI.profile(args1, function(err, res) {
            if (err) {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorError)
                    .setDescription("UUID not found.\n\nExmaple of UUID: \`853c80ef3c3749fdaa49938b674adae6\`");
                message.channel.send(embed);
                // console.log(err);
            } else {
                const embed = new Discord.MessageEmbed()
                    .setColor(config.embedColorMain)
                    .addFields({
                        name: "UUID",
                        value: res.id
                    }, {
                        name: "Player Name",
                        value: res.name
                    });

                message.channel.send(embed);
            }
        });
    }
}