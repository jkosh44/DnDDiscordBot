const Discord = require('discord.js');
const { encounter } = require('../util/encounter.js');
const { weightedEnemiesByArea } = require('../util/randomListsInitializer.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'enemy',
    description: 'produces a random enemy',
    usage: ['', '<area-name>'],
    authorizedUsers: [dungeon_master],
    authorizedChannels:['enemies'],
    execute(message, args) {
        if(!args.length) {
            const data = [];
            data.push('Here\'s a list of all the areas:');
            for(var area in weightedEnemiesByArea) {
                data.push(`**${area}**`);
            }
            return message.channel.send(data, { split: true });
        }
        else {
            const area = args[0];
            const weightedEnemies = weightedEnemiesByArea[area];
            if(!weightedEnemies) {
                return message.reply('I\'m sorry that area doesn\'t exist. For a list of all areas execute the command again with no arguments.');
            }
            const enemy = encounter(weightedEnemies.weightedDist, weightedEnemies.totalWeight);
            const embed = new Discord.RichEmbed()
                .setTitle('You\'ve encountered an enemy!')
                .addField(`The monster is ${enemy['Name']}`, `${enemy['Info']}`)
                .attachFile(`${enemy['Img']}`)
            message.channel.send({embed})
                .catch(e => {
                    console.log(`Error getting enemy information:\n${e}`);
                    message.channel.send(`Error getting info for enemy ${enemy['Name']}. Please check configuration files.`)
                });
        }
    },
};