const { encounter } = require('../util/encounter.js');
const { weightedEnemies } = require('../util/randomListsInitializer.js');

module.exports = {
    name: 'enemy',
    description: 'produces a random enemy',
    usage: [''],
    //authorizedUsers: ['387434995276447745'],
    execute(message, args) {
        const enemy = encounter(weightedEnemies.weightedDist, weightedEnemies.totalWeight);
        message.channel.send(enemy);
    },
};