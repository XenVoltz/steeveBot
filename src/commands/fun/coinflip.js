module.exports = {
    name: 'coinflip',
    description: 'Flip a coin',
    execute(message) {
        const outcomes = ["HEADS", "TAILS"]

        const flip = Math.floor(Math.random() * outcomes.length);
        return message.channel.send(`The coin landed on **${outcomes[flip]}**!`)
    }
}