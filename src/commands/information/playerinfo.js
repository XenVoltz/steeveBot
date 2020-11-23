const Discord = require('discord.js');
const config = require('./../../../config.json');
const MojangAPI = require('mojang-api');

module.exports = {
    name: 'playerinfo',
    description: 'Get information on a player. Displays last 10 name changes.',
    args: true,
    aliases: ['pi'],
    usage: '<user>',
    execute(message, args) {
        const args1 = args.splice(0).join();
        MojangAPI.nameToUuid(args1, function (err, res) {
            if (err)
                console.log(err);
            else {
                if (res[0] === undefined) {
                    const embed = new Discord.MessageEmbed()
                        .setColor(config.embedColorError)
                        .setDescription("That username does not exist")
                    return message.channel.send(embed);
                }
                const uuid = res[0].id;
                var nameChange;
                MojangAPI.nameHistory(uuid, function (err, res) {
                    const name = res[res.length - 1].name;
                    if (err) {
                        console.log(err);
                    } else {
                        if (res.length == 1) {
                            nameChange = `${res[0].name} has not changed their name.`;
                            const embed = new Discord.MessageEmbed()
                                .setColor(config.embedColorMain)
                                .setTitle(`Player Information for ${name}`)
                                .setDescription(`[NameMC Profile](https://namemc.com/search?q=${name})`)
                                .setThumbnail(`https://crafatar.com/renders/head/${uuid}`)
                                .addFields({
                                    name: 'UUID',
                                    value: `\`${uuid}\``,
                                }, {
                                    name: 'Skin',
                                    value: `[Click Here](https://crafatar.com/skins/${uuid})`,
                                    inline: true
                                }, {
                                    name: 'Name History',
                                    value: nameChange,
                                    incline: true
                                })
                                .setFooter(`[More Info Here](https://namemc.com/search?q=${name})`);
                            message.channel.send(embed);
                        } else {
                            let names = [];
                            for (i = res.length - 1; i >= res.length - 10; i--) {
                                if (res[i] === undefined) break;
                                names.push(`**${i + 1}.** \`${res[i].name}\``);
                            }
                            nameChange = names.reverse().join(`\n`);
                            const embed = new Discord.MessageEmbed()
                                .setColor(config.embedColorMain)
                                .setTitle(`Player Information for ${name}`)
                                .setDescription(`[NameMC Profile](https://namemc.com/search?q=${name})`)
                                .setThumbnail(`https://crafatar.com/renders/head/${uuid}`)
                                .addFields({
                                    name: 'UUID',
                                    value: `\`${uuid}\``,
                                }, {
                                    name: 'Skin',
                                    value: `[Click Here](https://crafatar.com/skins/${uuid})`,
                                    inline: true
                                }, {
                                    name: `Name History (Last ${names.length} Name Changes)`,
                                    value: nameChange,
                                    incline: true
                                });
                            return message.channel.send(embed);

                        }
                    }
                });
            }
        });

    }
}