const { manualLookUp } = require('../util/manual.js');
const { dungeon_master } = require('../config.json');

module.exports = {
    name: 'master',
    description: 'Direct messages the Dungeon Master some private info about the campaign',
    usage: ['<entry-name>', ''],
    authorizedUsers: [dungeon_master],
	execute(message, args) {
        manualLookUp(message, args, 'Master Manual', 'master-manual.json', 'master');
    },
};