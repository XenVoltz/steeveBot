const MojangAPI = require('mojang-api');
const Discord = require('discord.js')
const config = require('./../../config.json');
const functions = require('./../functions')

module.exports = {
    name: 'test',
    description: 'Test out things. **Restricted Command**',
    args: true,
    usage: '<required args>',
    execute(message, args) {
        // client.on('')
        // console.log(message.member.roles.cache.some(role => role.name === config.staffRoles[0]));
        if (message.author.id !== '296401940089274369') return message.channel.send("You do not have permission to run this command.");

        const args1 = args.splice(0).join(' ');
        YouTube.search(args1, { limit: 3 })
            .then((x) => {
                console.log(x);
            })
            .catch((error) => {
                console.log(error);
            }); 
        
    }
}
// const args1 = args.splice(0).join();
// functions.error((embed) => {
//     message.channel.send(embed)
// });