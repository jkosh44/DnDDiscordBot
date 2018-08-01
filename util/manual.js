const { prefix } = require('../config.json');

function manualLookUp(message, args, manualName, manualFileName, commandName) {
    const manual = require(`../resources/${manualFileName}`);
    const data = [];
    if(!args.length) {
        data.push(`Here's a list of all the ${manualName} entries:`);
        for(var entry in manual) {
            data.push(`**${entry}**`);
        }
        data.push(`\nYou can send '${prefix}${commandName} <entry-name> to get the contents of a specific entry`);
        return message.author.send(data, {split: true})
            .then(() => {
                if(message.channel.type === 'dm') {
                    return;
                }
                message.reply(`I've send you a DM with all the ${manualName} entries.`);
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
}

module.exports = {
    manualLookUp
}