const { encounter } = require('../util/encounter.js');
const { weightedItems } = require('../util/randomListsInitializer.js');

module.exports = {
    name: 'item',
    description: 'produces a random item',
    usage: [''],
    authorizedUsers: ['387434995276447745'],
    execute(message, args) {
        const item = encounter(weightedItems.weightedDist, weightedItems.totalWeight);
        message.channel.send(item);
    },
};