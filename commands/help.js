const { prefix } = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List\'s all of my commands or info about a specific command.',
    usage: ['', '<command-name>'],
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands
                .filter(command => !command.authorizedUsers || command.authorizedUsers.includes(message.author.id))        
                .map(command => `**${command.name}**`).join('\n'));

            data.push(`\nYou can send '${prefix}help <command-name>' to get info on a specific command!`);
            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') {
                        return;
                    }
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        else {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if(!command) {
                return message.reply('That\'s not a valid command.');
            }

            if(command.authorizedUsers && !command.authorizedUsers.includes(message.author.id)){
                return message.reply('You\'re not authorized to use this command.');
            }

            data.push(`**Name:** ${command.name}`);
            if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(',')}`);
            if (command.description) data.push(`**Description:** ${command.description}`);
            if (command.usage) {
                let usg = '';
                usg += `**Usages:** ${prefix}${command.name} ${command.usage[0]}`;
                for(var i = 1; i < command.usage.length; i++) {
                    usg += `, ${prefix}${command.name} ${command.usage[i]}`
                }
                data.push(usg);
            }

            message.channel.send(data, {split: true});
        }
    },
};