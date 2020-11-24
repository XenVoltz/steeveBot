const fs = require('fs');
const Discord = require('discord.js');

const config = require(__dirname + '/../config.json');
const messages = require(__dirname+ '/../messages.json');
// const db = require('quick.db');
const client = new Discord.Client();

function getDirectories() {
    return fs.readdirSync(__dirname + '/commands').filter(function subFolder(file) {
        return fs.statSync(__dirname + '/commands/' + file).isDirectory();
    });
}

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));

for (const folder of getDirectories()) {
    const folderFiles = fs.readdirSync(__dirname + '/commands/' + folder).filter(file => file.endsWith('.js'));
    for (const file of folderFiles) {
        commandFiles.push([folder, file]);
    }
}

for (const file of commandFiles) {
    let command;
    if (Array.isArray(file)) {
        command = require(__dirname + `/commands/${file[0]}/${file[1]}`);
    } else {
        command = require(__dirname + `/commands/${file}`);
    }
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot Online!");
    client.user.setActivity(`Under Development`);
});

client.on('guildCreate', async guild => {
    const date = new Date();
    console.log(`${config.botName} has just joined ${guild.name} on ${date}.`);
    let channelID;
    let channels = guild.channels.cache;

    channelLoop:
        for (let key in channels) {
            let c = channels[key];
            if (c[1].type === "text") {
                channelID = c[0];
                break channelLoop;
            }
        }
    const embed = new Discord.MessageEmbed()
        .setTitle("Information About Me")
        .setDescription(`Hello, I am Steeve, your handy dandy Minecraft helper. You can do \`s!help\` to get more information about me! Currently, \`s!\` is my prefix. If you would like to change it, do \`s!setprefix <prefix>`)
    let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
    channel.send(embed);

})
client.on('guildDelete', guild => {
    const date = new Date();
    console.log(`${config.botName} has just left ${guild.name} on ${date}.`);

})


client.on('message', async message => {
    if (message.system || message.channel.type === 'dm') return;

    const newPrefixChannel = message.guild.channels.cache.find(ch => ch.name.startsWith(`steeve-`))

    // Run if there is no prefix channel
    if (!newPrefixChannel) {
        const prefix = 's!';
        exports.prefix = prefix;
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) ||
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        message.delete();

        if (!command) return;
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments.`;
            let usage = `Usage: \`${prefix}${command.name} ${command.usage}\``

            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorError)
                .setDescription(`${reply}\n\n${usage}`)

            return message.channel.send(embed);
        }

        try {

            return command.execute(message, args, client);

        } catch (error) {

            console.error(error);
            const embed = new Discord.MessageEmbed()
                .setColor(config.embedColorError)
                .setTitle('ERROR')
                .setDescription(`${messages.commandError}`)
                .addFields({
                    name: 'Error',
                    value: `\`${error}\``,
                }, {
                    name: `Command`,
                    value: `\`${message}\``,
                })
                .setTimestamp()
                .setFooter(config.botName);
             return message.channel.send(embed);
        }
    }

    prefix = newPrefixChannel.name.split("-")[1];
    exports.prefix = prefix;

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    message.delete();

    if (!command) return;
    if (command.args && !args.length) {
        
        let reply = `You didn't provide any arguments.`;
        let usage = `Usage: \`${prefix}${command.name} ${command.usage}\``

        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorError)
            .setDescription(`${reply}\n\n${usage}`)

        return message.channel.send(embed);

    }

    try {
        command.execute(message, args, client);
    } catch (error) {

        console.error(error);
        const embed = new Discord.MessageEmbed()
            .setColor(config.embedColorError)
            .setTitle('ERROR')
            .setDescription(`${messages.commandError}`)
            .addFields({
                name: 'Error',
                value: `\`${error}\``,
            }, {
                name: `Command`,
                value: `\`${message}\``,
            })
            .setTimestamp()
            .setFooter(config.botName);
        return message.channel.send(embed);

    }
});

client.login(config.token);