const fs = require('fs');
const Discord = require('discord.js');
const { Manual } = require('./db/man-db.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    Manual.sync();
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLocaleLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if(!command) {
        return;
    }
    
    if(command.authorizedUsers && !command.authorizedUsers.includes(message.author.id)) {
        return message.reply('You are not authorized to use that command');
    }

    if(command.authorizedChannels && !command.authorizedChannels.includes(message.channel.name)) {
        return message.reply(`You can only execute this command in one of the following channels: ${command.authorizedChannels.join(', ')}`);
    }
    
    if (command.args && !args.length) {
        let reply = 'You didn\'t provide any arguments! See the proper usages below:';
        if(command.usage) {
            for (var i = 0; i < command.usage.length; i++) {
                reply += `\n\t'${prefix}${command.name} ${command.usage[i]}`;
            }
        }
        return message.reply(reply);
    }

    try {
       command.execute(message, args);
    }
    catch (error) {
        console.error(error);
        message.reply('OOPSIE WOOPSIE!! Uwu We make a fucky wucky!! A wittle fucko boingo! <@259396529016537088> is working VEWY HAWD to fix this!');
    }
});

client.login(token);