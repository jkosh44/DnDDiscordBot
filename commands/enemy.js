const { encounter } = require('../util/encounter.js');
const { weightedEnemies } = require('../util/randomListsInitializer.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'enemy',
    description: 'produces a random enemy',
    usage: [''],
    authorizedUsers: [dungeon_master],
    execute(message, args) {
        const enemy = encounter(weightedEnemies.weightedDist, weightedEnemies.totalWeight);
        message.channel.send(enemy);
    },
};