const manual = require('../resources/master-manual.json');
const { prefix } = require('../config.json');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'master',
    description: 'Direct messages the Dungeon Master some private info about the campaign',
    usage: ['<entry-name>', ''],
    authorizedUsers: [dungeon_master],
	execute(message, args) {
        const data = [];
        if(!args.length) {
            data.push('Here\'s a list of all the Master Manual entries:');
            for(var entry in manual) {
                data.push(`**${entry}**`);
            }
            data.push(`\nYou can send '${prefix}master <entry-name> to get the contents of a specific entry`);
            return message.author.send(data, {split: true})
                .then(() => {
                    if(message.channel.type === 'dm') {
                        return;
                    }
                    message.reply('I\'ve send you a DM with all the Master Manual entries.');
                })
                .catch(error => {
                    console.error(`Could not send dm DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
        else {
            const entry = args[0];
            data.push(`${entry}:`);
            data.push(`${manual[entry]}`);
            return message.author.send(data, {split: true})
                .then(() => {
                    if(message.channel.type === 'dm') {
                        return;
                    }
                    message.reply('I\'ve send you a DM with the contents of that Master Manual entry.');
                })
                .catch(error => {
                    console.error(`Could not send dm DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }
    },
};