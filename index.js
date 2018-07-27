const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json')

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    if(!client.commands.has(commandName)) {
        console.log(`command ${commandName} not recognized`);
        return;
    }

    try {
       client.commands.get(commandName).execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);