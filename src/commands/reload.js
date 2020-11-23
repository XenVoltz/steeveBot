module.exports = {
    name: 'reload',
    description: 'Reloads bot when running on server. **Restricted Command**',
    aliases: ['rl'],
    async execute(message) {
        if (message.author.id !== '296401940089274369') return message.channel.send("You do not have the permission to whitelist anyone.")
       await message.channel.send("Reloading...")
        process.exit();
    }
}