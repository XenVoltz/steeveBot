const mc = require('mc-stats');
const MojangAPI = require('mojang-api');
const Discord = require('discord.js');
const config = require('../../../config.json')

module.exports = {
    name: 'hypixel',
    description: 'Give Hypixel information on a player. **Currently Not Working**',
    args: true,
    aliases: ['hyp'],
    usage: '<ign> <stats/profile>',
    execute(message, args) {
        if(!message.member.hasPermission)
        if (message.author.id !== '296401940089274369') return;
        // console.log(args[0])
        if (args[2]) return message.channel.send("Too many arguments!")
        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorError)
                .setDescription(`You didn't provide enough arguments.\n\nUsage: \`${config.prefix}${this.name} ${this.usage}\``)

            return message.channel.send(embed);
        }
        const ign = args[0];
        const choice = args[1].toLowerCase();

        MojangAPI.nameToUuid(args[0], function (err, res) {
            if (err)
                console.log(err);
            else {
                if (res == []) return;
                mc.hypixelPlayer(ign, "75c0cc4a-b255-4576-bd83-260531d53157")
                    .then((data) => {
                        const firstLog = new Date(data.player.first_login);
                        const lastLog = new Date(data.player.last_login);
                        const lastLogOut = new Date(data.player.last_logout);

                        // if (choice !== 'stats' || choice !== 'profile') return;
                        if (choice == 'stats') return message.channel.send("This section is still under development.");
                        if (choice == 'profile') {

                            function numberWithCommas(x) {
                                return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            }
                            const embed = new Discord.MessageEmbed()
                                .setColor(config.embedColorMain)
                                .setAuthor(`${ign}'s Hypixel Profile`, `https://i.imgur.com/88kSslJ.jpg`)
                                .addFields({
                                    name: "Information",
                                    value: `Rank: \`${data.player.rankName}\`\nKarma: \`${data.player.karma}\`\nNetwork Experience: \`${numberWithCommas(data.player.networkExp)}\``,
                                    inline: true,
                                }, {
                                    name: "Dates",
                                    value: `First Logged In: \`${firstLog.toLocaleDateString("en-US")}\`\nLast Logged In: \`${lastLog.toLocaleDateString("en-US")}\`\nLast Logged Out: \`${lastLogOut.toLocaleDateString("en-US")}\``,
                                    inline: true,
                                }, )
                            return message.channel.send(embed);
                        }



                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        });
    }
}
// 75c0cc4a-b255-4576-bd83-260531d53157