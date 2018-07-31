const { encounter } = require('../util/encounter.js');
const { weightedItems } = require('../util/randomListsInitializer.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'item',
    description: 'produces a random item',
    usage: [''],
    authorizedUsers: [dungeon_master],
    execute(message, args) {
        const item = encounter(weightedItems.weightedDist, weightedItems.totalWeight);
        message.channel.send(item);
    },
};