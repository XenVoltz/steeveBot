const Discord = require('discord.js');
const { message } = require('./steeve')

module.exports = {
    error: function error() {
        const embed = new Discord.MessageEmbed()
            .setDescription("Test!");
    
    },
} 